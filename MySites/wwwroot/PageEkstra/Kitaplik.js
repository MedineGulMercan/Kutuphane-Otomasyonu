//#region BugünüÇeker
var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today1 = now.getFullYear() + "-" + (month) + "-" + (day);
//#endregion

//bu fonksiyon sayfa her yenilendiğinde içindeki kodları çalıştırır.
$(document).ready(function () {

    KitaplikTableGetir();

});

var KitaplikDataT;

function KitaplikTableGetir() {
    KitaplikDataT = $("#KitaplikTable").DataTable({
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
            url: "/Kitaplik/KitaplikGetAll",
            type: "GET",
            datatype: "json",
            dataSrc: "",
        },
        buttons: [
            {
                extend: 'excelHtml5',
                //columns'da excellde hangi kolonların görünür olmasını istediğimizi ayarlıyoruz.
                exportOptions: { columns: [3, 5, 7] },
                orientation: 'landscape',
                className: "btn btn-success",
                title: today1 + ' Kitaplıklar ', //inen excellin başlığıx
            },
            {
                extend: 'pdfHtml5',
                exportOptions: { columns: [':visible'] }, // colums visible tabloda görünen tüm kolonları pdf te gösteriyor.
                orientation: 'landscape',
                className: "btn btn-danger",
                pageSize: 'A3',
                title: today1 + ' Kitaplıklar ',
            },
            {
                extend: 'pageLength',
                orientation: 'landscape',
                className: "btn btn-info",
            },
            {

                extend: 'colvis',
                columns: [3, 5, 7],
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
                    return '<button class="btn btn-success Duzenle"><i class="fa-solid fa-pen-to-square"></i></button>'
                }
            },                                   //0
            {
                data: "Id", render: function (data, type, row) {
                    return '<button class="btn btn-danger Sil"><i class="fa-solid fa-trash"></i></button>'
                }
            },                                   //1       
            { data: "Id" },                      //2
            { data: "KitaplikAdi" },             //3
            { data: "OdaId" },                   //4
            { data: "OdaAdi" },                  //5
            { data: "KatId" },                   //6 
            { data: "KatAdi" },                  //7 
            { data: "AktifMi" },                 //8
        ],
        columnDefs: [
            {
                //ön  tarafta gözükmesini istemediğimiz kolonları burda false yaparız.Arkada görünür ama tasarımda görünmez.
                targets: [2, 4, 6, 8],
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
    $("#KitaplikTable tbody").on("click", ".Duzenle", async function () {
        var veri = KitaplikDataT.row($(this).parents("tr")).data(); //tıklanan satırın içindeki verileri "veri" değişkenine atar.
        await Vue.KitaplikDuzenle(veri);
    });
    $("#KitaplikTable tbody").on("click", ".Sil", async function () {
        var veri = KitaplikDataT.row($(this).parents("tr")).data(); //tıklanan satırın içindeki verileri "veri" değişkenine atar.
        await Vue.KitaplikSil(veri.Id);
    });
}
//#region  Vue
var Vue = new Vue({
    el: "#app",
    data: {
        Id: "",
        katId: "",
        odaId: "",
        kitaplikAdi: "",
        aktifMi: "",
        katlar: [],
        odalar: [],
    },
    methods: {
        async KitaplikEkle() {
            var Id = this.Id;
            if (Id != 0) {
                let formData = new FormData();
                formData.append("Id", this.Id);
                formData.append("KatId", this.katId);
                formData.append("OdaId", this.odaId);
                formData.append("KitaplikAdi", this.kitaplikAdi);
                formData.append("AktifMi", this.aktifMi);

                await $.ajax({ //ajax ı arkaya post atmak için kullanıyoruz.
                    url: "/Kitaplik/KitapGuncelle",
                    data: formData,
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function (e) {
                        $('#KitaplikModal').modal('hide'); // her kaydete basılıp kayıt başarılı olduğunda(success) pop-up ı kapat.
                        KitaplikDataT.ajax.reload(null, false);//Sayfa f5 lenmeden verileri güncelliyor.  içine null , false yazmazsak . sayfadaysak bizi . sayfaya atıyor.
                    },
                    error: function (message) {
                        console.log(message)
                    }
                });
            }
            else {
                let formData = new FormData();
                formData.append("KatId", this.katId);
                formData.append("OdaId", this.odaId);
                formData.append("KitaplikAdi", this.kitaplikAdi);
                await $.ajax({ //ajax ı arkaya post atmak için kullanıyoruz.
                    url: "/Kitaplik/KitapEkle",
                    data: formData,
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function (e) {
                        $('#KitaplikModal').modal('hide'); // her kaydete basılıp kayıt başarılı olduğunda(success) pop-up ı kapat.
                        KitaplikDataT.ajax.reload(null, false);//Sayfa f5 lenmeden verileri güncelliyor.  içine null , false yazmazsak . sayfadaysak bizi . sayfaya atıyor.
                    },
                    error: function (message) {
                        console.log(message)
                    }
                });
            }
        },
        async KitaplikDuzenle(kitapliklar) {
            this.Id = await kitapliklar.Id;
            this.katId = await kitapliklar.KatId
            await this.OdaGetir();
            this.odaId = await kitapliklar.OdaId;
            this.kitaplikAdi = await kitapliklar.KitaplikAdi;
            this.aktifMi = await kitapliklar.AktifMi;
            $('#KitaplikModal').modal('show');
        },
        async sifirla() {
            this.Id = "";
            this.kitaplikAdi = "";
            this.aktifMi = "";
        },
        async KitaplikSil(Id) {
            let formData = new FormData();
            formData.append("Id", Id);
            await $.ajax({ //ajax ı arkaya post atmak için kullanıyoruz.
                url: "/Kitaplik/KitaplikAktiflikSil",
                data: formData,
                type: 'POST',
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                cache: false,
                success: function (e) {
                    KitaplikDataT.ajax.reload(null, false);//Sayfa f5 lenmeden verileri güncelliyor.  içine null , false yazmazsak . sayfadaysak bizi . sayfaya atıyor.
                },
                error: function (message) {
                    console.log(message)
                }
            });
        },
        async KatGetir() {
            await $.ajax({
                url: '/Kitaplik/KatGetAll'
            }).done(veri => {
                this.katlar = veri;
                this.katId = veri[0].id;
            });
        },
        async OdaGetir() {
            var katId = this.katId;
            await $.ajax({
                url: '/Kitaplik/OdaGetAll',
                data: { katId }
            }).done(data => {
                this.odalar = data;
                this.odaId = data[0].id;
            });
        }
    },
    created() {
        this.KatGetir();
        this.OdaGetir();
    },
    befourupdate() {
        this.KatGetir();
        this.OdaGetir();
    }
});

//#endregion