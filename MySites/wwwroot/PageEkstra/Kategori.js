//#region BugünüÇeker
var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today1 = now.getFullYear() + "-" + (month) + "-" + (day);
//#endregion

//bu fonksiyon sayfa her yenilendiğinde içindeki kodları çalıştırır.
$(document).ready(function () {

    KategoriTableGetir();

});


var KategoriDataT;
function KategoriTableGetir() {
    KategoriDataT = $("#KategoriTable").DataTable({
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
            url: "/Kategori/KategoriGetAll",
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
                title: today1 + ' Kategoriler ', //inen excellin başlığıx
            },
            {
                extend: 'pdfHtml5',
                exportOptions: { columns: [':visible'] }, // colums visible tabloda görünen tüm kolonları pdf te gösteriyor.
                orientation: 'landscape',
                className: "btn btn-danger",
                pageSize: 'A3',
                title: today1 + ' Kategoriler ',
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
                    return '<button class="btn btn-success Duzenle">Düzenleme</button>'
                }
            },                                   //0
            {
                data: "id", render: function (data, type, row) {
                    return '<button class="btn btn-danger Sil">Sil</button>'
                }
            },                                   //1       
            { data: "id" },                      //2
            { data: "kategoriAdi" },             //3 
            { data: "aktifmi" },                 //4 
           
           

        ],
        columnDefs: [
            {
                //ön  tarafta gözükmesini istemediğimiz kolonları burda false yaparız.Arkada görünür ama tasarımda görünmez.
                targets: [2,4],
                visible: false,
                searchable: false,
            },
            {
                //butonların tabloda kapladığı yeri(genişliğini) küçülttüm.
                width: "1%",
                target:[0,1],
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
    $("#KategoriTable tbody").on("click", ".Duzenle", async function () {
        var veri = KategoriDataT.row($(this).parents("tr")).data(); //tıklanan satırın içindeki verileri "veri" değişkenine atar.
        await Vue.KategoriTanimla(veri);
    });
    $("#KategoriTable tbody").on("click", ".Sil", async function () {
        var veri = KategoriDataT.row($(this).parents("tr")).data(); //tıklanan satırın içindeki verileri "veri" değişkenine atar.
        await Vue.KategoriSil(veri.id);
    });
 
}

//#region  Vue
var Vue = new Vue({
    el: "#app",
    data: {
        id: "",
        kategoriAdi: "",
        aktifmi: "",
    },

    methods: {
        async KategoriEkle() {
            var Id = this.id;
            if (Id != 0) {
               
                let formData = new FormData();
                //arkadada tutlucak verinin ismi <> arkaya gönderilicek veri
                formData.append('Id', this.id);
                formData.append('KategoriAdi', this.kategoriAdi);
                formData.append('Aktifmi', this.aktifmi);
           
                await $.ajax({
                    url: "/Kategori/KategoriGuncelle",
                    data: formData,
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function (e) {
                        KategoriDataT.ajax.reload(null, false);//Sayfa f5 lenmeden verileri güncelliyor.  içine null , false yazmazsak . sayfadaysak bizi . sayfaya atıyor.
                    },
                    error: function (message) {
                        console.log(message)
                    }
                });
            }
            else {
                let formData = new FormData();
                //arkadada tutlucak verinin ismi <> arkaya gönderilicek veri
                //burada Id yi tutmuyoruz çünkü yeni kayıt ekleniyor ve Id sini sistem atayacak.
                formData.append('KategoriAdi', this.kategoriAdi);
                formData.append('Aktifmi', this.aktifmi);
               
                await $.ajax({
                    url: "/Kategori/KategoriEkle",
                    data: formData,
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function (e) {
                        KategoriDataT.ajax.reload(null, false);//Sayfa f5 lenmeden verileri güncelliyor
                    },
                    error: function (message) {
                        console.log(message)
                    }
                });
            }

            this.KategoriSifirla();
        },
        async KategoriSil(Id) {
            this.Id = Id;
            let formData = new FormData();
            //arkadada tutlucak verinin ismi <> arkaya gönderilicek veri
            formData.append('Id', this.Id);
            await $.ajax({
                url: "/Kategori/KategoriSil",
                data: formData,
                type: 'POST',
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                cache: false,
                success: function (e) {
                    KategoriDataT.ajax.reload(null, false);//Sayfa f5 lenmeden verileri güncelliyor
                },
                error: function (message) {
                    console.log(message)
                }
            });

        },
        async KategoriGetir() {
            await $.ajax({
                url: '/Kategori/KategoriGetAll'
            }).done(data => {
                this.kategoriler = data;
            });
        },
        KategoriSifirla() {
            this.Id = "";
            this.kategoriAdi = "";
            this.aktifmi = "";
            
        },
        async KategoriTanimla(veri) {
            console.log(veri)
            this.id = veri.id;
            this.kategoriAdi = veri.kategoriAdi;
            this.aktifmi = veri.aktifmi;
           
        }
    },
    created() {
        this.KategoriGetir();
    },
    befourupdate() {
        this.KategoriGetir();
    }
});
//#endregion