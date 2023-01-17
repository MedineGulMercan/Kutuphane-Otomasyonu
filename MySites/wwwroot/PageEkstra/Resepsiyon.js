//#region BugünüÇeker
var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today1 = now.getFullYear() + "-" + (month) + "-" + (day);
//#endregion

//bu fonksiyon sayfa her yenilendiğinde içindeki kodları çalıştırır.
$(document).ready(function () {
    KitapTableGetir();
    KullanicilarTableGetir();
    ResTableGetir();
});
var KitapId = 0;

var KitapDataT;
function KitapTableGetir() {
    KitapDataT = $("#KitapTable").DataTable({
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
        responsive: false, // 
        order: [[0, "desc"]], //verilerin hangisine göre sıralanacağını belirleriz (column içindeki index numarasına göre)
        lengthMenu: [[10, 25, 50, -1], ['10', '25', '50', 'Hepsini Göster']],
        ajax: {
            url: "/Resepsiyon/KitapGetAll",
            type: "GET",
            datatype: "json",
            dataSrc: "",
        },
        buttons: [
            {
                extend: 'pageLength',
                orientation: 'landscape',
                className: "btn btn-info",
            }
        ],
        columns: [
            {
                data: "id", render: function (data, type, row) {
                    return '<button class="btn btn-success Sec"><i class="fa-solid fa-check"></i></button>'
                }
            },                                   //0      
            { data: "id" },                      //1
            { data: "kitapSeriNo" },             //2 
            { data: "kitapAdi" },                //3 
            { data: "kitapYazari" },             //4 
            { data: "kitapSayfaSayisi" },        //5 
            { data: "kitapYayinEvi" },           //6 
            { data: "kitapBasimYili" },          //7 
            { data: "kitapOzeti" },              //8 
            { data: "kitapKonusu" },             //9 
            { data: "kategoriId" },              //10
            { data: "kitapStok" },               //11
            {
                data: "kitapResimYolu", render: function (data) {
                    return '<a href="' + data + '" target="_blank">Resim</a>'
                }
            },                                   //12

        ],
        columnDefs: [
            {
                //ön  tarafta gözükmesini istemediğimiz kolonları burda false yaparız.Arkada görünür ama tasarımda görünmez.
                targets: [2, 11],
                visible: false,
                searchable: false,
            },
        ],
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.12.1/i18n/tr.json"
        },
        stateSave: true,
        stateSaveCallback: function (settings, data) {
            localStorage.setItem('DataTables_' + settings.sInstance, JSON.stringify(data))
        },
        stateLoadCallback: function (settings) {
            return JSON.parse(localStorage.getItem('DataTables_' + settings.sInstance))
        }
    });
    $("#KitapTable tbody").on("click", ".Sec", async function () {
        var veri = KitapDataT.row($(this).parents("tr")).data(); //tıklanan satırın içindeki verileri "veri" değişkenine atar.
        $('#ResepsiyonModal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $('#KullanicilarModal').modal('show');
        KitapId = veri.id;
    });
}

var KullanicilarDataT;
function KullanicilarTableGetir() {
    KullanicilarDataT = $("#KullaniciTable").DataTable({
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
        responsive: false, // 
        order: [[1, "desc"]], //verilerin hangisine göre sıralanacağını belirleriz (column içindeki index numarasına göre)
        lengthMenu: [[10, 25, 50, -1], ['10', '25', '50', 'Hepsini Göster']],
        ajax: {
            url: "/Resepsiyon/KullaniciGetAll",
            type: "GET",
            datatype: "json",
            dataSrc: "",
        },
        buttons: [
            {
                extend: 'pageLength',
                orientation: 'landscape',
                className: "btn btn-info",
            }
        ],
        columns: [
            {
                data: "id", render: function (data, type, row) {
                    return '<button class="btn btn-success Sec"><i class="fa-solid fa-check"></i></button>'
                }
            },                                   //0      
            { data: "id" },                      //1
            { data: "tc" },                      //2 
            { data: "isim" },                    //3 
            { data: "soyisim" },                 //4 
            { data: "telefon" },                 //5 
            { data: "mail" },                    //6 

        ],
        columnDefs: [
            {
                //ön  tarafta gözükmesini istemediğimiz kolonları burda false yaparız.Arkada görünür ama tasarımda görünmez.
                targets: [1],
                visible: false,
                searchable: false,
            },
        ],
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.12.1/i18n/tr.json"
        },
        stateSave: true,
        stateSaveCallback: function (settings, data) {
            localStorage.setItem('DataTables_' + settings.sInstance, JSON.stringify(data))
        },
        stateLoadCallback: function (settings) {
            return JSON.parse(localStorage.getItem('DataTables_' + settings.sInstance))
        }
    });
    $("#KullaniciTable tbody").on("click", ".Sec", async function () {
        var veri = KullanicilarDataT.row($(this).parents("tr")).data(); //tıklanan satırın içindeki verileri "veri" değişkenine atar.
        var KullaniciId = veri.id;
        await Vue.ResepsiyonTanimla(KitapId, KullaniciId)

    });
}

var ResepSiyonDataT;
function ResTableGetir() {
    ResepSiyonDataT = $("#ResepsiyonTable").DataTable({
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
            url: "/Resepsiyon/ResepsiyonGetAll",
            type: "GET",
            datatype: "json",
            dataSrc: "",
        },
        buttons: [
            {
                extend: 'excelHtml5',
                //columns'da excellde hangi kolonların görünür olmasını istediğimizi ayarlıyoruz.
                exportOptions: { columns: [3, 5, 6, 7, 9] },
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
                columns: [3,5,6,7,9],
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
                data: "Id", render: function (data, type, row) {
                    return '<button class="btn btn-danger Teslim"><i class="fa-solid fa-trash"></i></button>'
                }
            },                                   //0       
            { data: "Id" },                      //1
            { data: "KitapId" },                 //2 
            { data: "KitapAdi" },                //3 
            { data: "KullaniciId" },             //4 
            { data: "Isim" },                    //5 
            { data: "Soyisim" },                 //6 
            { data: "TC" },                      //7 
            { data: "SorumluId" },               //8 
            { data: "Sorumlu" },                 //9 
        ],
        columnDefs: [
            {
                //ön  tarafta gözükmesini istemediğimiz kolonları burda false yaparız.Arkada görünür ama tasarımda görünmez.
                targets: [1, 2, 4, 8],
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
    $("#ResepsiyonTable tbody").on("click", ".Teslim", async function () {
        var veri = ResepSiyonDataT.row($(this).parents("tr")).data(); //tıklanan satırın içindeki verileri "veri" değişkenine atar.
        Vue.ResepsiyonSil(veri.Id);
    });

}
//#endregion

//#region  Vue
var Vue = new Vue({
    el: "#app",
    data: {
        kitapId: "",
        kitapAdi: "",
        kitapYazari: "",
        kitapYayinEvi: "",
        kullaniciId: "",
        isim: "",
        soyisim: "",
        tc: "",
    },
    methods: {
        async ResepsiyonOnay() {
            let formData = new FormData();
            formData.append("KitapId", this.kitapId);
            formData.append("KullaniciId", this.kullaniciId);
            await $.ajax({ //ajax ı arkaya post atmak için kullanıyoruz.
                url: "/Resepsiyon/ResepsiyonEkle",
                data: formData,
                type: 'POST',
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                cache: false,
                success: function (e) {
                    $('#ResepsiyonOnayModal').modal('hide');
                    $('body').removeClass('modal-open');
                    $('.modal-backdrop').remove();
                },
                error: function (message) {
                    console.log(message)
                }
            });
        },
        async ResepsiyonTanimla(kitapId, kullaniciId) {
            await $.ajax({
                url: '/Resepsiyon/KitapGetir',
                data: { kitapId }
            }).done(veri => {
                this.kitapId = veri.id;
                this.kitapAdi = veri.kitapAdi;
                this.kitapYazari = veri.kitapYazari;
                this.kitapYayinEvi = veri.kitapYayinEvi;
            });

            await $.ajax({
                url: '/Resepsiyon/KullaniciGetir',
                data: { kullaniciId }
            }).done(veri => {
                this.kullaniciId = veri.id;
                this.isim = veri.isim;
                this.soyisim = veri.soyisim;
                this.tc = veri.tc;
            });
            await $('#KullanicilarModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            await $('#ResepsiyonOnayModal').modal('show');
        },
        async ResepsiyonSil(Id) {
            await $.ajax({ //ajax ı arkaya post atmak için kullanıyoruz.
                url: "/Resepsiyon/ResepsiyonSil",
                data: {Id},
                type: 'POST',
                success: function (e) {
                    ResepSiyonDataT.ajax.reload(null, false);//Sayfa f5 lenmeden verileri güncelliyor.  içine null , false yazmazsak . sayfadaysak bizi . sayfaya atıyor.
                },
                error: function (message) {
                    console.log(message)
                }
            });
        },
    }
});

//#endregion