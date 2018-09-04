// WebTrends SmartSource Data Collector Tag v10.4.23
// Copyright (c) 2017 Webtrends Inc.  All rights reserved.
// Tag Builder Version: 4.1.3.6
// Created: 2017.06.13
// Updated: 2017.09.27 - WT added getcg, scroll_depth and advanceLinkTracking plugins.
// Updated: 2017.10.02 - WT removed advanceLinkTracking plugin, added custom torontolinktrack plugin, set all standard trackers to false
// Updated: 2017.10.23 - WT add phone tracker, set i18n false
// Updated: 2017.10.24 - add preserve:false to keep parameters in memory on subsequent link clicks
// Updated: 2017.11.06 - WT add adview parameters adimpressions:true,adsparam:"WT.ac"
window.webtrendsAsyncInit=function(){
    var dcs=new Webtrends.dcs().init({
        dcsid:"dcs222clfigsgada5sghv6dw2_9b4q",
        domain:"statse.webtrendslive.com",
        timezone:-5,
        i18n:false,
        offsite:false,
        download:false,
        downloadtypes:"avi,csv,doc,docm,docx,flv,gzip,ics,json,m4a,mp3,mp4,pdf,ppt,pptm,pptx,rar,swf,txt,wmv,xls,xlsm,xlsx,xml,xsd,zip,geojson",
        anchor:false,
        javascript: false,
        metanames:"DC.title",
        preserve:false,
        adimpressions:true,
        adsparam:"WT.ac",
        onsitedoms:new RegExp("\.opendata\.inter\.sandbox-toronto\.ca"),
        fpcdom:".portal0.cf.opendata.inter.sandbox-toronto.ca",
        plugins:{
            getcg:{src:"https://www.toronto.ca/scripts/webtrends.getcg.js"},
            scroll_depth:{src:"https://www.toronto.ca/scripts/webtrends.scroll_depth.js"},
            torontolinktrack:{src:"https://www.toronto.ca/scripts/toronto.linktrack.js",
                download: true,
                anchor: true,
                javascript: true,
                email: true,
                phone: true,
                rightclick: true,
                offsite: true,
                onsite: true,
                forms: true,
                onsiteallowed: ["app.toronto.ca", "booking.toronto.ca", "efun.toronto.ca", "map.toronto.ca", "secure.toronto.ca", "wx.toronto.ca"]},
            facebook:{src:"//s.webtrends.com/js/webtrends.fb.js"},
			debug:{src:"//s.webtrends.com/js/webtrends.debug.js"},		
            yt:{src:"//s.webtrends.com/js/webtrends.yt.js"}
        }
        }).track();
};
(function(){
    var s=document.createElement("script"); s.async=true; s.src="//s.webtrends.com/js/webtrends.js";    
    var s2=document.getElementsByTagName("script")[0]; s2.parentNode.insertBefore(s,s2);
}());
