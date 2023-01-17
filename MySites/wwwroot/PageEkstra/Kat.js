//#region BugünüÇeker
var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today1 = now.getFullYear() + "-" + (month) + "-" + (day);
//#endregion

//bu fonksiyon sayfa her yenilendiğinde içindeki kodları çalıştırır.
$(document).ready(function () {
    KatTableGetir();
});

var KatDataT;

function KatTableGetir() {
    KatDataT = $("#KatTable").DataTable({
        paging: true, //sayfalama (tabloda belirli sayılarda gelen veriyi diğer sayfaya atar)
        select: true, //satırı seç
        dom: "Blfrtip",
        lengthChange: false, //kaç veriden sonra sayfalama yapsın
        searching: true, //tablo içinde arama
        ordering: true,//filtreleme
        info: true,//tablodaki veri sayyısı
        scrollX: false,//aşağı yukarı kaydırma
        autoWidth: true,
        destroy: true, //aynı verileri üstüne yazar
        responsive: true, // 
        order: [[2, "desc"]], //verilerin hangisine göre sıralanacağını belirleriz (column içindeki index numarasına göre)
        lengthMenu: [[10, 25, 50, -1], ['10', '25', '50', 'Hepsini Göster']],
        ajax: {
            url: "/Kat/KatGetAll",
            type: "GET",
            datatype: "json",
            dataSrc: "",
        },
        buttons: [
            {
                extend: 'excelHtml5',
                //columns'da excellde hangi kolonların görünür olmasını istediğimizi ayarlıyoruz.
                exportOptions: { columns: [3] },
                orientation: 'landscape',
                className: "btn btn-success",
                title: today1 + ' Katlar ', //inen excellin başlığıx
            },
            {
                extend: 'pdfHtml5',
                exportOptions: { columns: [':visible'] }, // colums visible tabloda görünen tüm kolonları pdf te gösteriyor.
                orientation: 'landscape',
                className: "btn btn-danger",
                pageSize: 'A3',
                title: today1 + ' Katlar ',
            },
            {
                extend: 'pageLength',
                orientation: 'landscape',
                className: "btn btn-info",
            },
            {

                extend: 'colvis',
                columns: [3],
                orientation: 'landscape',
                className: "btn btn-info",
            },
            {
                extend: 'copy',
                exportOptions: { columns: [':visible'] },
                orientation: 'landscape',
                className: "btn btn-info",
            },
        ],
        columns: [
            {
                data: "id", render: function (data, type, row) {
                    return '<button class="btn btn-success Duzenle"><i class="fa-solid fa-pen-to-square"></i></button>'
                }
            },                                   //0
            {
                data: "id", render: function (data, type, row) {
                    return '<button class="btn btn-danger Sil"><i class="fa-solid fa-trash"></i></button>'
                }
            },                                   //1       
            { data: "id" },                      //2
            { data: "katAdi" },                  //3 
            { data: "aktifMi" },                 //4 
        ],
        columnDefs: [
            {
                //ön  tarafta gözükmesini istemediğimiz kolonları burda false yaparız.Arkada görünür ama tasarımda görünmez.
                targets: [2, 4],
                visible: false,
                searchable: false,
            },
            {
                //butonların tabloda kapladığı yeri(genişliğini) küçülttüm.
                width: "1%",
                target: [0, 1],
            },
        ],
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.12.1/i18n/tr.json" //tablo özelliklerini türkçe yapıyor.
        },
        stateSave: true,
        stateSaveCallback: function (settings, data) {
            localStorage.setItem('DataTables_' + settings.sInstance, JSON.stringify(data))
        },
        stateLoadCallback: function (settings) {
            return JSON.parse(localStorage.getItem('DataTables_' + settings.sInstance))
        }
    });
    $("#KatTable tbody").on("click", ".Duzenle", async function () {
        var veri = KatDataT.row($(this).parents("tr")).data(); //tıklanan satırın içindeki verileri "veri" değişkenine atar.
        await Vue.KatDuzenle(veri);
    });
    $("#KatTable tbody").on("click", ".Sil", async function () {
        var veri = KatDataT.row($(this).parents("tr")).data(); //tıklanan satırın içindeki verileri "veri" değişkenine atar.
        await Vue.KatSil(veri.id);
    });

}



//#region  Vue
var Vue = new Vue({
    el: "#app",
    data: {
        Id: "",
        katAdi: "",
        aktifMi: ""

    },

    methods: {
        async KatEkle() {
            var Id = this.Id;
            console.log(Id);
            if (Id != 0) {
                let formData = new FormData();

                formData.append("Id", this.Id);
                formData.append("KatAdi", this.katAdi);
                formData.append("AktifMi", this.aktifMi);

                await $.ajax({ //ajax ı arkaya post atmak için kullanıyoruz.
                    url: "/Kat/KatGuncelle",
                    data: formData,
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function (e) {
                        $('#KatModal').modal('hide'); // her kaydete basılıp kayıt başarılı olduğunda(success) pop-up ı kapat.
                        KatDataT.ajax.reload(null, false);//Sayfa f5 lenmeden verileri güncelliyor.  içine null , false yazmazsak . sayfadaysak bizi . sayfaya atıyor.
                    },
                    error: function (message) {
                        console.log(message)
                    }
                });

            }
            else {

                let formData = new FormData();
                formData.append("KatAdi", this.katAdi),
                    await $.ajax({ //ajax ı arkaya post atmak için kullanıyoruz.
                        url: "/Kat/KatEkle",
                        data: formData,
                        type: 'POST',
                        enctype: 'multipart/form-data',
                        processData: false,
                        contentType: false,
                        cache: false,
                        success: function (e) {
                            $('#KatModal').modal('hide'); // her kaydete basılıp kayıt başarılı olduğunda(success) pop-up ı kapat.
                            KatDataT.ajax.reload(null, false);//Sayfa f5 lenmeden verileri güncelliyor.  içine null , false yazmazsak . sayfadaysak bizi . sayfaya atıyor.
                        },
                        error: function (message) {
                            console.log(message)
                        }
                    });
            }
        },
        async KatDuzenle(katlar) {
            console.log(katlar)
            this.Id = katlar.id;
            this.katAdi = katlar.katAdi;
            this.aktifMi = katlar.aktifMi;
            $('#KatModal').modal('show');
        },
        async sifirla() {
            this.Id = "";
            this.katAdi = "";
            this.aktifMi = "";
        },
        async KatSil(Id) {
            let formData = new FormData();
            formData.append("Id", Id),
                await $.ajax({ //ajax ı arkaya post atmak için kullanıyoruz.
                    url: "/Kat/KatAktiflikSil",
                    data: formData,
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function (e) {
                   
                        KatDataT.ajax.reload(null, false);//Sayfa f5 lenmeden verileri güncelliyor.  içine null , false yazmazsak . sayfadaysak bizi . sayfaya atıyor.
                    },
                    error: function (message) {
                        console.log(message)
                    }
                });

        }

    },
    created() {

    },
    befourupdate() {

    }
});

//#endregion