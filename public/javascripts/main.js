var mapOptions = {
    center: new naver.maps.LatLng(35.8429, 127.1267),
    zoom: 17
};

var map = new naver.maps.Map('map', mapOptions);

$.ajax({
    url: "/location",
    type: "GET"
}).done(response =>{
    if(response.message !== "success") return;
    const data = response.data;

    let markerList = [];
    let infowindowList = [];

    const getClickHandler = (i) => () => {
        const marker = markerList[i];
        const infowindow = infowindowList[i];
        if(infowindow.getMap()){
            infowindow.close();
        }
        else{
            infowindow.open(map,marker);
        }
    };
    // function getClickHandler(i){
    //     return fucntion(){

    //     }
    // }
    const getClickMap = (i) => () => {
        const infowindow = infowindowList[i];
        infowindow.close();
    }

    for(let i in data){
        const target = data[i];
        const latlng = new naver.maps.LatLng(target.lat, target.lng);

        let marker = new naver.maps.Marker({
            map: map,
            position: latlng,
            icon : {
                content: `<div class="marker"></div>`,
                anchor: new naver.maps.Point(7.5, 7.5),
            },
        });
        const content = `
        <div class="infowindow_wrap">
            <div class="infowindow_title">${target.title}</div>
            <div class="infowindow_address">${target.address}</div>
            <div class="infowindow_cafeseat">잔여좌석 : ${target.cafeseat}석</div>
        </div>
        `;

        const infowindow = new naver.maps.InfoWindow({
            content: content,
            backgroundColor: "#00ff0000",
            borderColor: "#00ff0000",
            anchorSize: new naver.maps.Size(0, 0),
        });
        markerList.push(marker);
        infowindowList.push(infowindow);
    }

    for(let i=0, ii=markerList.length; i<ii; i++){
        naver.maps.Event.addListener(markerList[i], "click", getClickHandler(i));
        naver.maps.Event.addListener(map, "click", getClickMap(i));
    }
});


