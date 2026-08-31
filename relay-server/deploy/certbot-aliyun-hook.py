#!/usr/bin/env python3
"""certbot DNS-01 auth hook for Alibaba Cloud DNS

凭据从环境变量读取，不要硬编码：
  export ALIYUN_ACCESS_KEY_ID=xxx
  export ALIYUN_ACCESS_KEY_SECRET=xxx
"""
import json, os, sys, hashlib, hmac, base64, time, urllib.request, urllib.parse

ACCESS_KEY_ID = os.environ["ALIYUN_ACCESS_KEY_ID"]
ACCESS_KEY_SECRET = os.environ["ALIYUN_ACCESS_KEY_SECRET"]

def sign(params):
    sorted_keys = sorted(params.keys())
    query = "&".join(f"{k}={urllib.parse.quote(str(params[k]), safe='')}" for k in sorted_keys)
    string_to_sign = f"GET&{urllib.parse.quote('/', safe='')}&{urllib.parse.quote(query, safe='')}"
    sig = base64.b64encode(hmac.new(
        (ACCESS_KEY_SECRET + "&").encode(), string_to_sign.encode(), hashlib.sha1
    ).digest()).decode()
    return f"https://alidns.aliyuncs.com/?{query}&Signature={urllib.parse.quote(sig, safe='')}"

def api_call(params):
    url = sign(params)
    req = urllib.request.Request(url)
    resp = urllib.request.urlopen(req)
    return json.loads(resp.read())

def main():
    action = sys.argv[1]  # "deploy" or "clean"
    domain = "_acme-challenge.relay.myczdfkz.shop"
    value = os.environ["CERTBOT_VALIDATION"]

    if action == "deploy":
        resp = api_call({
            "Action": "AddDomainRecord",
            "DomainName": "myczdfkz.shop",
            "RR": "_acme-challenge.relay",
            "Type": "TXT",
            "Value": value,
            "Format": "JSON",
            "Version": "2015-01-09",
            "AccessKeyId": ACCESS_KEY_ID,
            "SignatureMethod": "HMAC-SHA1",
            "Timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "SignatureVersion": "1.0",
            "SignatureNonce": hashlib.md5(str(time.time()).encode()).hexdigest(),
        })
        print(f"TXT record created: {resp.get('RecordId')}")

    elif action == "clean":
        # Find and delete the TXT record
        resp = api_call({
            "Action": "DescribeDomainRecords",
            "DomainName": "myczdfkz.shop",
            "RRKeyWord": "_acme-challenge.relay",
            "Type": "TXT",
            "Format": "JSON",
            "Version": "2015-01-09",
            "AccessKeyId": ACCESS_KEY_ID,
            "SignatureMethod": "HMAC-SHA1",
            "Timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "SignatureVersion": "1.0",
            "SignatureNonce": hashlib.md5(str(time.time()).encode()).hexdigest(),
        })
        records = resp.get("DomainRecords", {}).get("Record", [])
        for r in records:
            api_call({
                "Action": "DeleteDomainRecord",
                "RecordId": r["RecordId"],
                "Format": "JSON",
                "Version": "2015-01-09",
                "AccessKeyId": ACCESS_KEY_ID,
                "SignatureMethod": "HMAC-SHA1",
                "Timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                "SignatureVersion": "1.0",
                "SignatureNonce": hashlib.md5(str(time.time()).encode()).hexdigest(),
            })
            print(f"TXT record deleted: {r['RecordId']}")

if __name__ == "__main__":
    main()
