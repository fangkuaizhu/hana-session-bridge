#!/usr/bin/env python3
"""certbot DNS-01 auth hook for Alibaba Cloud DNS（通用版）。

与同目录 certbot-aliyun-hook.py 的区别：本脚本从 CERTBOT_DOMAIN 推导
_acme-challenge 记录名，可用于 myczdfkz.shop 下的任意子域（relay / sbti / ...），
旧脚本把 relay 子域写死了。

用法：
  certbot certonly --manual --preferred-challenges dns \
    --manual-auth-hook 'python3 /path/certbot-aliyun-hook-generic.py deploy' \
    --manual-cleanup-hook 'python3 /path/certbot-aliyun-hook-generic.py clean' \
    -d sbti.myczdfkz.shop --cert-name sbti.myczdfkz.shop \
    --agree-tos --no-eff-email -m admin@myczdfkz.shop --non-interactive

凭据通过环境变量传入（VPS 上部署的副本因 certbot 不传 env，采用内联写法，与旧脚本一致）：
  export ALIYUN_ACCESS_KEY_ID=...
  export ALIYUN_ACCESS_KEY_SECRET=...
"""
import json, os, sys, hashlib, hmac, base64, time, urllib.request, urllib.parse

ACCESS_KEY_ID = os.environ["ALIYUN_ACCESS_KEY_ID"]
ACCESS_KEY_SECRET = os.environ["ALIYUN_ACCESS_KEY_SECRET"]
BASE_DOMAIN = os.environ.get("ALIYUN_BASE_DOMAIN", "myczdfkz.shop")


def sign(params):
    sorted_keys = sorted(params.keys())
    query = "&".join(f"{k}={urllib.parse.quote(str(params[k]), safe='')}" for k in sorted_keys)
    string_to_sign = f"GET&{urllib.parse.quote('/', safe='')}&{urllib.parse.quote(query, safe='')}"
    sig = base64.b64encode(hmac.new(
        (ACCESS_KEY_SECRET + "&").encode(), string_to_sign.encode(), hashlib.sha1
    ).digest()).decode()
    return f"https://alidns.aliyuncs.com/?{query}&Signature={urllib.parse.quote(sig, safe='')}"


def api_call(params):
    resp = urllib.request.urlopen(urllib.request.Request(sign(params)))
    return json.loads(resp.read())


def base_params(action):
    return {
        "Action": action,
        "DomainName": BASE_DOMAIN,
        "Format": "JSON",
        "Version": "2015-01-09",
        "AccessKeyId": ACCESS_KEY_ID,
        "SignatureMethod": "HMAC-SHA1",
        "Timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
        "SignatureVersion": "1.0",
        "SignatureNonce": hashlib.md5(str(time.time()).encode()).hexdigest(),
    }


def rr_name(domain):
    """sbti.myczdfkz.shop -> _acme-challenge.sbti ; myczdfkz.shop -> _acme-challenge"""
    suffix = "." + BASE_DOMAIN
    if domain == BASE_DOMAIN:
        return "_acme-challenge"
    if domain.endswith(suffix):
        return "_acme-challenge." + domain[:-len(suffix)]
    return "_acme-challenge." + domain.split(".")[0]


def main():
    action = sys.argv[1]  # "deploy" or "clean"
    domain = os.environ.get("CERTBOT_DOMAIN") or (sys.argv[2] if len(sys.argv) > 2 else "")
    if not domain:
        print("缺少域名：请通过 CERTBOT_DOMAIN 环境变量传入", file=sys.stderr)
        sys.exit(2)
    rr = rr_name(domain)
    print(f"[hook] domain={domain} rr={rr} action={action}", file=sys.stderr)

    if action == "deploy":
        p = base_params("AddDomainRecord")
        p.update({"RR": rr, "Type": "TXT", "Value": os.environ["CERTBOT_VALIDATION"]})
        print(f"TXT record created: {api_call(p).get('RecordId')}")

    elif action == "clean":
        p = base_params("DescribeDomainRecords")
        p.update({"RRKeyWord": rr, "Type": "TXT"})
        for r in api_call(p).get("DomainRecords", {}).get("Record", []):
            if r.get("RR") != rr:
                continue
            api_call({**base_params("DeleteDomainRecord"), "RecordId": r["RecordId"]})
            print(f"TXT record deleted: {r['RecordId']}")


if __name__ == "__main__":
    main()
