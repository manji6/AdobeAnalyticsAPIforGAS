# AdobeAnalytics API Controller for Google Apps Script

(日本語は下に書いておきました)

====

This is Adobe Analytics API Controller utility script for Google Apps Script.

## Description
This code include some function and runs on Google Apps Script.

## Demo
Sorry, I can't prepare demo.
but, this is very easy to use. So, please download code and have fun!

## Requirement
- Google Account
- Adobe Analytics Account(Company)
  - please enable "use API service" roll your Adobe Analytics Account.
- Adobe Developer Connection Account & create application.
  - if you don't have please create account or application, please see below.
  - please get secretkey & username.

### Adobe Developer Connection
- [Create an application](https://marketing.adobe.com/developer/documentation/authentication-1/auth-register-app-1)


## Usage

## Install
1. copy "AdobeAnalyticsAPI.gs" code from this github.
2. please go to [Google Apps Script editor](https://script.google.com/) and paste it.
3. set some script property. please set below more detail.

| property name | value |
|-----|-----|
| spreadsheet_path | spreadsheet file path.(create new spreadsheet file and copy URL) |
| Analytics_api_secretkey | your application (in Adobe Developer Connection) secret key. |
| Analytics_api_username | your application (in Adobe Developer Connection) user name. |
| Analytics_reportsuite_id | Report Suite ID you want to get the data. |

4. customized myFunction() (please write code that you want to run here.)
5. run "myFuntion()"


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

[manji6](https://github.com/manji6)


===
このコードはAdobe AnalyticsのAPIを操作するGoogle Apps Scriptです。

## Description
このコードにはGoogle Apps Script上で動くように幾つかの関数が準備されております。

## Demo
ごめんなさい、Demo環境は用意出来ていません。
でも使い方は簡単なので、ダウンロードして使ってみてください。

## Requirement
- Google Account(Google Driveが使える)
- Adobe Analytics Account(Company)
  - 自分のアカウントがAPIサービスを利用できるようになっていること
- Adobe Developer Connection Account & create application.
  - もしAdobe Developer Connectionのアカウントやアプリケーションを作る場合は、下のリンクを確認してください。
  - アカウントとアプリケーションを作成したら、シークレットキーとユーザーIDをメモしておいてください。

### Adobe Developer Connection
- [Create an application](https://marketing.adobe.com/developer/documentation/authentication-1/auth-register-app-1)


## Usage

## Install
1. このgithub上にある "AdobeAnalyticsAPI.gs" code をコピーしてください。
2. [Google Apps Script editor](https://script.google.com/) に移動し、コピーしたコードを貼り付けてください。
3. 幾つかのスクリプトプロパティを設定する必要があります。下の内容を参考に設定してください。

| property name | value |
|:------|:------|
| spreadsheet_path | 保存するスプレッドシートのパス(新規スプレッドシートを作成してURLをコピー＆貼り付け) |
| Analytics_api_secretkey | Adobe Developer's connectionで作った Application の secret key. |
| Analytics_api_username | Adobe Developer's connectionで作った Application の ユーザ名. |
| Analytics_reportsuite_id | データ取得元のレポートスイートID |

4. myFuntion()の中身を実行したい内容に応じてカスタマイズしてください。(下に関数リストを書きました)
5. myFunction()を実行してください。


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

[manji6](https://github.com/manji6)
