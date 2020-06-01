# AdobeAnalytics API Controller for Google Apps Script

(日本語は下に書いておきました)

====

This is Adobe Analytics API (v1.4) Controller utility script for Google Apps Script.

## Description
This code include some function and runs on Google Apps Script.

## Demo
Sorry, I can't prepare demo.
but, this is very easy to use. So, please download code and have fun!

## Requirement
- Google Account
- Adobe Analytics Account(Company)
  - please enable "use API service" roll your Adobe Analytics Account.
- Adobe I/O
  - You need to create a new Adobe Analytics API project from Adobe I/O Console (https://console.adobe.io). Please check the following link for more details,
https://www.adobe.io/apis/experiencecloud/analytics/docs.html#!AdobeDocs/analytics-2.0-apis/master/create-oauth-client.md


## Usage

## Install
1. copy "AdobeAnalyticsAPI.gs" code from this github.
2. please go to [Google Apps Script editor](https://script.google.com/) and paste it.
3. set some script property. please set below more detail.

| property name | value |
|-----|-----|
| spreadsheet_path | spreadsheet file path.(create new spreadsheet file and copy URL) |

4. create a new sheet named "Auth", then set the following parameters on the sheet.

|  | A | B |
|:------|:------|:------|
| 1 | Report Suite ID | Report Suite ID(s) that you want to get the data. (you can set multiple report suite IDs with comma-delimited.) |
| 2 | API Key | Client ID of your Adobe Analytics API project (the same with API Key) |
| 3 | Client Secret | Client Secret of your Adobe Analytics API project |
| 4 | JWT Payload | JWT Payload of your Adobe Analytics API project. You can find it from Service Account (JWT) > Generate JWT |
| 5 | Private Key | Private key that is used for creating your Adobe Analytics API project |
| 6 | Global Company ID | Your Global Company ID. You can check your global company ID by running the funciton "checkGlobalCompanyId" |
| 7 | Result of the function "checkGlobalCompanyId" | (Leave this blank) The response of running the function "checkGlobalCompanyId" is stored here automatically |

Example,
![Google Spreadsheet](https://github.com/oriken/AdobeAnalyticsAPIforGAS/blob/master/sheet_auth.png)


5. customized myFunction() (please write code that you want to run here.)
6. run "myFuntion()"


## Feature
this code support below funtion.

### saveSDR()
get eVar,prop,events data from ReportSuite and save current spreadsheet.

### saveEvarsList()
get eVar data from ReportSuite and save current spreadsheet.

### savePropsList()
get props data from ReportSuite and save current spreadsheet.

### saveEventsList()
get events data from ReportSuite and save current spreadsheet.

### saveSegmentsList()
get segments data from your account and save current spreadsheet.

### saveSegments()
update segments data from "segments" spreadsheet.

- if you want create segments from spreadsheet, please fill in below parameter.
  - Name(required)
  - Description(option)
  - reportsuiteID(required)
  - definition(required)
  - tags(option)
  - favorite(option)

> ID is not needed. if you run this function, ID is automatic grant from Adobe Analytics.

- if you want **update** segments from spreadsheet, you must keep "ID" column.


## Licence

[MIT](https://github.com/tcnksm/tool/blob/master/LICENCE)

## Author

[manji6](https://github.com/manji6), [oriken](https://github.com/oriken)


===

このコードは Adobe Analytics の API (v1.4) を操作する Google Apps Script です。

## Description
このコードには Google Apps Script 上で動くように幾つかの関数が準備されております。

## Demo
ごめんなさい、Demo環境は用意出来ていません。
でも使い方は簡単なので、ダウンロードして使ってみてください。

## Requirement
- Google Account (Google Driveが使える)
- Adobe Analytics Account (Company)
  - 自分のアカウントがAPIサービスを利用できるようになっていること
- Adobe I/O
  - Adobe I/O コンソールにて Adobe Analytics API の Project を作成し、Client ID, Client Secret, Technical Account ID 等を準備する必要があります。詳しくは以下をご覧ください。
https://www.adobe.io/apis/experiencecloud/analytics/docs.html#!AdobeDocs/analytics-2.0-apis/master/create-oauth-client.md

## Usage

## Install
1. このgithub上にある "AdobeAnalyticsAPI.gs" code をコピーしてください。
2. [Google Apps Script editor](https://script.google.com/) に移動し、コピーしたコードを貼り付けてください。
3. 幾つかのスクリプトプロパティを設定する必要があります。下の内容を参考に設定してください。

| property name | value |
|:------|:------|
| spreadsheet_path | 保存するスプレッドシートのパス(新規スプレッドシートを作成してURLをコピー＆貼り付け) |

4. 3. で指定したスプレッドシートに、「Auth」というシートを作成し、以下の値を設定してください

|  | A | B |
|:------|:------|:------|
| 1 | Report Suite ID | データ取得元のレポートスイートID（複数ある場合はカンマ区切りで列挙） |
| 2 | API Key | Adobe Analytics API project の Client ID (API Key と Client ID は同じ値です) |
| 3 | Client Secret | Adobe Analytics API project の Client Secret |
| 4 | JWT Payload | Adobe Analytics API project にて、Service Account (JWT) > Generate JWT で作成した JWT Payload |
| 5 | Private Key | Adobe Analytics API project 作成時に利用した秘密鍵 |
| 6 | Global Company ID | あなたのアカウントの Global Company ID. 不明な場合は、一度 "checkGlobalCompanyId" を実行して確認してください |
| 7 | Result of the function "checkGlobalCompanyId" | 【記入不要】関数 "checkGlobalCompanyId" を実行すると結果が自動で入力されます |

例
![Google Spreadsheet](https://github.com/oriken/AdobeAnalyticsAPIforGAS/blob/master/sheet_auth.png)

5. myFuntion()の中身を実行したい内容に応じてカスタマイズしてください。(下に関数リストを書きました)
6. myFunction()を実行してください。



## Feature
このコードは以下の関数がサポートされております。

### saveSDR()
eVar,prop,events データをレポートスイートから取り出してスプレッドシートに保存します。

### saveEvarsList()
eVar データをレポートスイートから取り出してスプレッドシートに保存します。

### savePropsList()
props データをレポートスイートから取り出してスプレッドシートに保存します。

### saveEventsList()
events データをレポートスイートから取り出してスプレッドシートに保存します。

### saveSegmentsList()
セグメントデータを自分のアカウントから取り出してスプレッドシートに保存します。

### saveSegments()
スプレッドシート上の"segments"シートに記載されている情報を元にセグメントの更新・追加を行います。

- もしセグメントを新規作成したい場合、当該シートの新規行に対して以下の値を設定してください。
  - Name(required)
  - Description(option)
  - reportsuiteID(required)
  - definition(required)
  - tags(option)
  - favorite(option)

> 新規作成時にIDは不要です。この関数を実行後、自動的にAdobe AnalyticsがIDを採番します。

- もしセグメントを **アップデート** したい場合は必ずIDを含めておいてください。


## Licence

[MIT](https://github.com/tcnksm/tool/blob/master/LICENCE)

## Author

[manji6](https://github.com/manji6), [oriken](https://github.com/oriken)
