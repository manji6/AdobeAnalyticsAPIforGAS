// =====================================
// Adobe Analtyics API Controller Library
//
// @language Google Apps Script
// @created manji6 <https://github.com/manji6/>
// =====================================


// Configuration: Obtain AdobeAnalytics web API token
var API_TOKEN = "https://api.omniture.com/";
var API_ENDPOINT = "https://api.omniture.com/admin/1.4/rest/";
var SPREADSHEET_SHEETLIST = ["prop","eVar","events","segments"];
var API_USERNAME = PropertiesService.getScriptProperties().getProperty('Analytics_api_username');
var API_SECRETKEY = PropertiesService.getScriptProperties().getProperty('Analytics_api_secretkey');
var FILE_SPREADSHEET = PropertiesService.getScriptProperties().getProperty('spreadsheet_path');
var ANALYTICS_RSID = PropertiesService.getScriptProperties().getProperty('Analytics_reportsuite_id');

// error handling
if (!API_USERNAME) {
  throw 'You should set "API_USERNAME" property from [File] > [Project properties] > [Script properties]';
}
if (!API_SECRETKEY) {
  throw 'You should set "API_SECRETKEY" property from [File] > [Project properties] > [Script properties]';
}
if (!FILE_SPREADSHEET) {
  throw 'You should set "FILE_SPREADSHEET" property from [File] > [Project properties] > [Script properties]';
}
if (!ANALYTICS_RSID) {
  throw 'You should set "ANALYTICS_RSID" property from [File] > [Project properties] > [Script properties]';
}


var AdobeAnalyticsAPIController = (function() {

  // constructor function
  function AdobeAnalyticsAPIController() {

    this.token_key = ""; //API Token key
    this.setDebug = false; // if true, output log.

    //initialize spreadsheet
    this.initializeSpreadsheet();

    // get Access Token & Save
    this.getToken();

  };

  /**
   * AdobeAnalyticsAPIController.prototype.Logger()
   * Logger
   *
   * @param {Any} data debug data
   * @param {Object} option output option
   * -> title: output title line before debug data line
   * -> prefix: added prefix text before debug data
   **/
  AdobeAnalyticsAPIController.prototype.Logger = function(data, option) {
    if (this.setDebug) {

      if (option) {
        if (option.title) {
          Logger.log("======[" + option.title + "]======");
        }
        if (option.prefix) {
          data = option.prefix + " | " + data;
        }
      }
      Logger.log(data);
    }
  };

  /**
   * AdobeAnalyticsAPIController.prototype.initializeSpreadsheet()
   * initialize spreadsheet setting.
   * - set sheet(eVar/prop/events/segments)
   *
   **/
   AdobeAnalyticsAPIController.prototype.initializeSpreadsheet = function(){

    // open spreadsheet
    var url = FILE_SPREADSHEET;
    var spreadsheet = SpreadsheetApp.openByUrl(url);


    // set default sheets list
    var sheets = spreadsheet.getSheets();
    var sheets_list = [];

    for(var i in sheets){
      sheets_list.push(sheets[i].getSheetName());
    }

    for(var i in SPREADSHEET_SHEETLIST){
      if(sheets_list.indexOf(SPREADSHEET_SHEETLIST[i]) == -1){
        spreadsheet.insertSheet(SPREADSHEET_SHEETLIST[i], i);
      }
    }

    spreadsheet.setActiveSheet(spreadsheet.getSheetByName("prop"));
  }


  /**
   * AdobeAnalyticsAPIController.prototype.getToken()
   * get Analytics Report API Token key
   *
   **/
  AdobeAnalyticsAPIController.prototype.getToken = function() {

    // create POST element
    // added api access information to Header.
    //  if you want to get this credentials, please visit ->  https://marketing.adobe.com/developer/applications/new
    var options = {
      "method": "POST",
      "headers": {
        "Authorization": " Basic " + Utilities.base64Encode(API_USERNAME + ":" + API_SECRETKEY)
      },
      "payload": {
        "grant_type": "client_credentials"
      },
      "muteHttpExceptions": true
    };

    var res = UrlFetchApp.fetch(API_TOKEN + "token", options);
    var data = JSON.parse(res.getContentText("UTF-8"));
    this.token_key = data.access_token;

  };

  /**
   * AdobeAnalyticsAPIController.prototype.execRequest()
   * execute Request API
   *
   * @param {String} method API Method
   * @param {Object} data object
   **/
  AdobeAnalyticsAPIController.prototype.execRequest = function(method, data) {

    this.Logger(data, {
      "title": "execRequest"
    });

    var options = {
      "method": "POST",
      "payload": JSON.stringify(data),
      "muteHttpExceptions": false
    }

    var send_url = API_ENDPOINT + "?" + "method=" + method + "&access_token=" + this.token_key;
    this.Logger(send_url, {
      "prefix": "Request URL"
    });

    var res = UrlFetchApp.fetch(send_url, options);
    var data = JSON.parse(res.getContentText("UTF-8"));

    return data;

  };


  /**
   * AdobeAnalyticsAPIController.prototype.savePropsList()
   * get Props List from define RSID & save Spreadsheet.
   *
   **/
  AdobeAnalyticsAPIController.prototype.savePropsList = function() {

    // get eVarList
    var dataList = this.execRequest("ReportSuite.GetProps", {
      "rsid_list": [ANALYTICS_RSID]
    });

    var propArray = this.sortPropsData(dataList);
    this.saveSpreadsheet("prop", propArray,{
      "row": {
        1: {
          "bgcolor": "#ebeced"
        }
      }
    });

  };

  /**
   * AdobeAnalyticsAPIController.prototype.sortPropsData()
   * Shaping the Props data for output.
   *
   * @param {Object} data Props data object
   **/
  AdobeAnalyticsAPIController.prototype.sortPropsData = function(data) {

    var data_array = [];

    // set Title Header Line.
    var data_title = ["ID", "Name", "Enabled", "Pathing Enabled", "List Enabled", "Participation Enabled"];
    data_array.push(data_title);

    for (var i in data[0].props) {
      data_array.push([data[0].props[i].id, data[0].props[i].name, data[0].props[i].enabled, data[0].props[i].pathing_enabled, data[0].props[i].list_enabled, data[0].props[i].participation_enabled]);
    }

    return data_array;
  }


  /**
   * AdobeAnalyticsAPIController.prototype.saveEvarsList()
   * get eVars List from define RSID & save Spreadsheet.
   *
   **/
  AdobeAnalyticsAPIController.prototype.saveEvarsList = function() {

    // get eVarList
    var eVarList = this.execRequest("ReportSuite.GetEvars", {
      "rsid_list": [ANALYTICS_RSID]
    });

    var eVarArray = this.sortEvarsData(eVarList);
    this.saveSpreadsheet("eVar", eVarArray,{
      "row": {
        1: {
          "bgcolor": "#ebeced"
        }
      }
    });

  };

  /**
   * AdobeAnalyticsAPIController.prototype.sortEvarsData()
   * Shaping the eVars data for output.
   *
   * @param {Object} data eVars data object
   **/
  AdobeAnalyticsAPIController.prototype.sortEvarsData = function(data) {

    var data_array = [];

    // set Title Header Line.
    var data_title = ["ID", "Name", "Type", "Enabled", "ExpirationType", "AllocationType"];
    data_array.push(data_title);

    for (var i in data[0].evars) {
      var sub_array = [];

      // if current line "id" is "trackingcode", this line data is s.camapign variables(defualt variable)
      if (data[0].evars[i].id == "trackingcode") {
        data[0].evars[i].description = "";
        data[0].evars[i].enabled = true;
      }

      // if current line expiration_type is "days", use expiration_custom_days for expiration_type column data
      if (data[0].evars[i].expiration_type == "days") {
        data[0].evars[i].expiration_type = data[0].evars[i].expiration_custom_days + " " + data[0].evars[i].expiration_type;
      }

      sub_array.push(data[0].evars[i].id, data[0].evars[i].name, data[0].evars[i].type, data[0].evars[i].enabled, data[0].evars[i].expiration_type, data[0].evars[i].allocation_type);

      Logger.log(sub_array);
      data_array.push(sub_array);
    }

    return data_array;
  }




  /**
   * AdobeAnalyticsAPIController.prototype.saveEventsList()
   * get event List from define RSID & save Spreadsheet.
   *
   * @param {Object} data event data object
   **/
  AdobeAnalyticsAPIController.prototype.saveEventsList = function() {

    // get eventsList
    var eventsList = this.execRequest("ReportSuite.GetEvents", {
      "rsid_list": [ANALYTICS_RSID]
    });

    var eventsList = this.sortEventsData(eventsList);
    this.saveSpreadsheet("events", eventsList,{
      "row": {
        1: {
          "bgcolor": "#ebeced"
        }
      }
    });

  };

  /**
   * AdobeAnalyticsAPIController.prototype.sortEventsData()
   * Shaping the Events data for output.
   *
   * @param {Object} data Events data object
   **/
  AdobeAnalyticsAPIController.prototype.sortEventsData = function(data) {

    var data_array = [];

    // set Title Header Line.
    var data_title = ["ID", "Name", "description", "type", "participation", "serialization", "polarity", "visibility"];
    data_array.push(data_title);


    for (var i in data[0].events) {
      var sub_array = [];

      sub_array.push(data[0].events[i].id, data[0].events[i].name, data[0].events[i].description, data[0].events[i].type, data[0].events[i].participation, data[0].events[i].serialization, data[0].events[i].polarity, data[0].events[i].visibility);

      Logger.log(sub_array);
      data_array.push(sub_array);
    }

    return data_array;
  }


  /**
   * AdobeAnalyticsAPIController.prototype.saveSegmentsList()
   * get segments list from define RSID & save Spreadsheet.
   *
   * @param {Object} request (optional) if you want to customize to get segment list API call, set this object.
   **/
  AdobeAnalyticsAPIController.prototype.saveSegmentsList = function(request) {

    if (!request) {
      request = {};
    }


    if (!request.fields) {
      request.fields = ["tags", "shares", "description", "owner", "modified", "compatibility", "favorite", "reportSuiteID", "definition"];
    }

    // run API
    var dataList = this.sortSegmentsData(this.execRequest("Segments.Get", request));

    this.Logger(dataList);

    // customize Difinition cols(more easy to view.)
    for (var i in dataList) {
      // header row is out of target.
      if (i > 0) {
        dataList[i][6] = JSON.stringify(JSON.parse(dataList[i][6]), null, "\t");
      }
    }

    // save spreadsheet
    var sheet = this.saveSpreadsheet("segments", dataList,{
      "row": {
        1: {
          "bgcolor": "#ebeced"
        }
      }
    });
  };

  /**
   * AdobeAnalyticsAPIController.prototype.sortSegmentsData()
   * Shaping the Segments data for output.
   *
   * @param {Object} data Segments data object
   **/
  AdobeAnalyticsAPIController.prototype.sortSegmentsData = function(data) {

    var data_array = [];
    // set Title Header Line.
    var data_title = ["ID", "Name", "Description", "owner", "modified", "reportSuiteID", "definition", "tags", "shares", "favorite"];
    data_array.push(data_title);

    // data constcution is [{key: val},{},...]
    for (var i in data) {
      var sub_array = [];
      sub_array.push(data[i].id, data[i].name, data[i].description, data[i].owner, data[i].modified, data[i].reportSuiteID, JSON.stringify(data[i].definition), data[i].tags, data[i].shares, data[i].favorite);
      data_array.push(sub_array);
    }

    return data_array;
  };


  /**
   * AdobeAnalyticsAPIController.prototype.saveSegments()
   * save Segments from segment spreadsheet data.
   *
   * @param {Object} data Props data object
   **/
  AdobeAnalyticsAPIController.prototype.saveSegments = function() {

    var sheet = this.getSpreadsheet("segments");

    //set last row Num and col Num from segments
    var startrow = 1;
    var startcol = 1;
    var lastrow = sheet.getLastRow();
    var lastcol = sheet.getLastColumn();

    // get Sheet data
    var sheet_segments_data = sheet.getRange(2, 1, lastrow, lastcol).getValues();

    // update segments list
    var request_api_default = {
      "definition": "",
      "name": "",
      "reportSuiteID": "",
      "Description": ""
    };

    for (var i in sheet_segments_data) {
      if (sheet_segments_data[i][1]) {

        var request_api_tags = null;
        if(sheet_segments_data[i][7]){
          request_api_tags = sheet_segments_data[i][7].split(",");
        }

        var request_api = {
          "definition": JSON.parse(sheet_segments_data[i][6]),
          "name": sheet_segments_data[i][1],
          "reportSuiteID": sheet_segments_data[i][5],
          "description": sheet_segments_data[i][2],
          "tags": request_api_tags
        };


        // if segment id is set, segment data is update referrer spreadsheet's data.
        if (sheet_segments_data[i][0]) {
          request_api.id = sheet_segments_data[i][0];
        }

        this.execRequest("Segments.Save", request_api);
      }
    }
  }

  /**
   * AdobeAnalyticsAPIController.prototype.saveSpreadsheet()
   * Open spreadsheet and save the data to a spreadsheet.
   *
   * @param {String} name sheet name
   * @param {Object} data data to be written to current spreadsheet
   * @param {Object} option write option
   * -> col
   *   -> {Col_Num}
   *     -> width: if you want custom width, please input number.(Unit pixel)
   **/
  AdobeAnalyticsAPIController.prototype.saveSpreadsheet = function(name, data, option) {

    // open spreadsheet
    var url = FILE_SPREADSHEET;
    var spreadsheet = SpreadsheetApp.openByUrl(url);

    var sheets = spreadsheet.getSheets();
    for (var i in sheets) {

      if (sheets[i].getSheetName() == name) {
        Logger.log("SHEET NAME:" + sheets[i].getSheetName());

        var sheet = sheets[i];

        var startrow = 1;
        var startcol = 1;
        var lastrow = sheet.getLastRow();
        var lastcol = sheet.getLastColumn();


        // execute option setting
        if (option) {
          // execute col setting
          if (option.col) {
            for (col_no in option.col) {
              // "width": execute col width
              if (option.col[col_no].width) {
                sheet.setColumnWidth(col_no, option.col[col_no].width);
              }
            }
          }
          if(option.row){
            for(row_no in option.row){
              var sheet_range = sheet.getRange(row_no,1,1,255);
              if(option.row[row_no].bgcolor){
                sheet_range.setBackground(option.row[row_no].bgcolor);
              }
            }
          }
        }

        // you must write once!
        sheet.getRange(1, 1, data.length, data[0].length).setValues(data);
      }
    }

    return sheet;
  }

  /**
  * AdobeAnalyticsAPIController.prototype.getSpreadsheet()
  * get spreadsheet data.
  *
  * @param {String} name Spreadsheet name
  **/
  AdobeAnalyticsAPIController.prototype.getSpreadsheet = function(name) {

    var spreadsheet = SpreadsheetApp.openByUrl(FILE_SPREADSHEET);
    var sheet = spreadsheet.getSheetByName(name);

    return sheet;
  }

  /**
   * AdobeAnalyticsAPIController.prototype.saveSDR()
   * get RSID setting(eVar/prop/events) and write spreadsheet.
   *
   **/
  AdobeAnalyticsAPIController.prototype.saveSDR = function() {
    this.saveEvarsList();
    this.savePropsList();
    this.saveEventsList();
  }
  return AdobeAnalyticsAPIController;
})();



function myFunction() {
  var adobeAnalyticsController = new AdobeAnalyticsAPIController();

  // save eVar,prop,events sheet
  //adobeAnalyticsController.saveSDR();

  // get eVar data and save eVar sheet
  //adobeAnalyticsController.saveEvarsList();

  // save prop data and save prop sheet
  //adobeAnalyticsController.savePropsList();

  // save events data and save events sheet
  //adobeAnalyticsController.saveEventsList();


  // get segments data and save segments sheet
  //   request setting: https://marketing.adobe.com/developer/documentation/segments-1-4/r-get-1
  //adobeAnalyticsController.saveSegmentsList();

  // update segments data from segments sheet
  //adobeAnalyticsController.saveSegments();

}
