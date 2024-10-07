var wms_layers = [];


        var lyr_EsriLightGray_0 = new ol.layer.Tile({
            'title': 'Esri Light Gray',
            //'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' ',
                url: 'https://server.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'
            })
        });
var lyr_NDVI_QUEENS_1 = new ol.layer.Image({
                            opacity: 1,
                            title: "NDVI_QUEENS",
                            
                            
                            source: new ol.source.ImageStatic({
                               url: "./layers/NDVI_QUEENS_1.png",
    attributions: ' ',
                                projection: 'EPSG:3857',
                                alwaysInRange: true,
                                imageExtent: [-8233812.089241, 4944678.735849, -8204152.599403, 4983218.458251]
                            })
                        });
var lyr_NDVI_MANHATTAN_2 = new ol.layer.Image({
                            opacity: 1,
                            title: "NDVI_MANHATTAN",
                            
                            
                            source: new ol.source.ImageStatic({
                               url: "./layers/NDVI_MANHATTAN_2.png",
    attributions: ' ',
                                projection: 'EPSG:3857',
                                alwaysInRange: true,
                                imageExtent: [-8242935.928058, 4965558.049644, -8227246.012457, 4994657.505960]
                            })
                        });
var lyr_NDVI_BRONX_3 = new ol.layer.Image({
                            opacity: 1,
                            title: "NDVI_BRONX",
                            
                            
                            source: new ol.source.ImageStatic({
                               url: "./layers/NDVI_BRONX_3.png",
    attributions: ' ',
                                projection: 'EPSG:3857',
                                alwaysInRange: true,
                                imageExtent: [-8230304.808630, 4980591.794320, -8211398.598927, 4999884.805393]
                            })
                        });
var lyr_NDVI_BROOKLYN_4 = new ol.layer.Image({
                            opacity: 1,
                            title: "NDVI_BROOKLYN",
                            
                            
                            source: new ol.source.ImageStatic({
                               url: "./layers/NDVI_BROOKLYN_4.png",
    attributions: ' ',
                                projection: 'EPSG:3857',
                                alwaysInRange: true,
                                imageExtent: [-8242365.335064, 4948842.149289, -8218920.717645, 4974022.783768]
                            })
                        });
var lyr_NDVI_STATEN_ISLAND_5 = new ol.layer.Image({
                            opacity: 1,
                            title: "NDVI_STATEN_ISLAND",
                            
                            
                            source: new ol.source.ImageStatic({
                               url: "./layers/NDVI_STATEN_ISLAND_5.png",
    attributions: ' ',
                                projection: 'EPSG:3857',
                                alwaysInRange: true,
                                imageExtent: [-8266088.361725, 4938127.170742, -8243030.616816, 4960843.057023]
                            })
                        });
var group_NDVI = new ol.layer.Group({
                                layers: [lyr_NDVI_QUEENS_1,lyr_NDVI_MANHATTAN_2,lyr_NDVI_BRONX_3,lyr_NDVI_BROOKLYN_4,lyr_NDVI_STATEN_ISLAND_5,],
                                fold: "open",
                                title: "NDVI"});

lyr_EsriLightGray_0.setVisible(true);lyr_NDVI_QUEENS_1.setVisible(true);lyr_NDVI_MANHATTAN_2.setVisible(true);lyr_NDVI_BRONX_3.setVisible(true);lyr_NDVI_BROOKLYN_4.setVisible(true);lyr_NDVI_STATEN_ISLAND_5.setVisible(true);
var layersList = [lyr_EsriLightGray_0,group_NDVI];
