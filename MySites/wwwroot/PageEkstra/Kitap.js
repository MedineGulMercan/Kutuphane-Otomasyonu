//#region BugünüÇeker
var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today1 = now.getFullYear() + "-" + (month) + "-" + (day);
//#endregion

//bu fonksiyon sayfa her yenilendiğinde içindeki kodları çalıştırır.
$(document).ready(function () {

    KitapTableGetir();

});

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
            url: "/Kitap/KitapGetAll",
            type: "GET",
            datatype: "json",
            dataSrc: "",
        },
        buttons: [
            {
                extend: 'excelHtml5',
                exportOptions: { columns: [':visible'] },
                orientation: 'landscape',
                className: "btn btn-success",
                title: today1 + ' Kitaplar ', //inen excellin başlığıx
            },
            {
                extend: 'pdfHtml5',
                exportOptions: { columns: [':visible'] },
                orientation: 'landscape',
                className: "btn btn-danger",
                pageSize: 'A3',
                title: today1 + ' Kitaplar ',
            },
            {
                extend: 'pageLength',
                orientation: 'landscape',
                className: "btn btn-info",
            },
            {
                extend: 'colvis',
                columns: [0],
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
            { data: "kitapSeriNo" },             //3 
            { data: "kitapAdi" },                //4 
            { data: "kitapYazari" },             //5 
            { data: "kitapSayfaSayisi" },        //6 
            { data: "kitapYayinEvi" },           //7 
            { data: "kitapBasimYili" },          //8 
            { data: "kitapOzeti" },              //9 
            { data: "kitapKonusu" },             //10 
            { data: "kategoriId" },              //11
            { data: "kitapStok" },               //12
            {
                data: "kitapResimYolu", render: function (data) {
                    return '<a href="' + data +'" target="_blank">Resim</a>'
                }
            },                                   //13

        ],
        columnDefs: [
            {
                //ön  tarafta gözükmesini istemediğimiz kolonları burda false yaparız.Arkada görünür ama tasarımda görünmez.
                targets: [2,11],
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
    $("#KitapTable tbody").on("click", ".Duzenle", async function () {
        var veri = KitapDataT.row($(this).parents("tr")).data(); //tıklanan satırın içindeki verileri "veri" değişkenine atar.
        var veriRaf = "";
        var KitapId = veri.id;
        await $.ajax({
            url: '/Kitap/RaflarGetAll',
            data: { KitapId }
        }).done(data => {
            veriRaf = data;
        });
        await Vue.KitapTanimla(veri,veriRaf);
    });
    $("#KitapTable tbody").on("click", ".Sil", async function () {
        var veri = KitapDataT.row($(this).parents("tr")).data(); //tıklanan satırın içindeki verileri "veri" değişkenine atar.
        await Vue.KitapSil(veri.id);
    });
}
//#endregion


//#region  Vue
var Vue = new Vue({
    el: "#app",
    data: {
        Id: "",
        kitapSeriNo: "",
        kitapAdi: "",
        KitapYazari: "",
        kitapSayfaSayisi: "",
        kitapYayinEvi: "",
        kitapStok: "",
        kitapBasimYili: "",
        kitapOzeti: "",
        kitapKonusu: "",
        kategoriler: [],
        secilenKategori: "",

        katlar: [],
        katId: "",
        odalar: [],
        odaId: "",
        kitapliklar: [],
        kitaplikId: "",
        raflar: [],
        rafId: "",
        kitapButton: false,

        dosyaSil: false,
        dosyaSilinecek: false,
        dosyaVarmı: false,
    },

    methods: {
        async KitapEkle() {
            // burada Id kontrolü yapıyoruz. Yeni kaydettiğimiz verilerin Id leri sıfırdır. Eğer Id 0 dan farklıysa bu
            //kaydı olan veri güncelleniyor demektir. Id sıfırsa yeni kayıt aç, farklıysa güncelle methodu oluşturdum.
            var Id = this.Id;
            if (Id != 0) {
                this.file = this.$refs.refs.files[0];
                let formData = new FormData();
                formData.append('file', this.file);
                //arkadada tutlucak verinin ismi <> arkaya gönderilicek veri
                formData.append('Id', this.Id);
                formData.append('KitapSeriNo', this.kitapSeriNo);
                formData.append('KitapAdi', this.kitapAdi);
                formData.append('KitapYazari', this.KitapYazari);
                formData.append('KitapSayfaSayisi', this.kitapSayfaSayisi);
                formData.append('KitapYayinEvi', this.kitapYayinEvi);
                formData.append('KitapBasimYili', this.kitapBasimYili);
                formData.append('KitapOzeti', this.kitapOzeti);
                formData.append('KitapKonusu', this.kitapKonusu);
                formData.append('KategoriId', this.secilenKategori);
                formData.append('KitapStok', this.kitapStok);
                formData.append('RafId', this.rafId);
                formData.append('DosyaSilinicek', this.dosyaSilinecek);
                await $.ajax({
                    url: "/Kitap/KitapGuncelle",
                    data: formData,
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function (e) {
                        KitapDataT.ajax.reload(null, false);//Sayfa f5 lenmeden verileri güncelliyor.  içine null , false yazmazsak 5. sayfadaysak bizi 1. sayfaya atıyor.
                    },
                    error: function (message) {
                        console.log(message)
                    }
                });
            }
            else {
                this.file = this.$refs.refs.files[0];
                let formData = new FormData();
                formData.append('file', this.file);
                //arkadada tutlucak verinin ismi <> arkaya gönderilicek veri
                formData.append('KitapSeriNo', this.kitapSeriNo);
                formData.append('KitapAdi', this.kitapAdi);
                formData.append('KitapYazari', this.KitapYazari);
                formData.append('KitapSayfaSayisi', this.kitapSayfaSayisi);
                formData.append('KitapYayinEvi', this.kitapYayinEvi);
                formData.append('KitapBasimYili', this.kitapBasimYili);
                formData.append('KitapOzeti', this.kitapOzeti);
                formData.append('KitapKonusu', this.kitapKonusu);
                formData.append('KitapStok', this.kitapStok);
                formData.append('KategoriId', this.secilenKategori);
                formData.append('RafId', this.rafId);
                
                await $.ajax({
                    url: "/Kitap/KitapEkle",
                    data: formData,
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function (e) {
                        KitapDataT.ajax.reload(null , false);//Sayfa f5 lenmeden verileri güncelliyor
                    },
                    error: function (message) {
                        console.log(message)
                    }
                });
            }
            
            this.KitapSifirla();
        },
        DosyaSil() {
            if (this.dosyaSil == false) {
                this.dosyaSil = true;
                this.dosyaSilinecek = false;
            }
            else {
                this.dosyaSil = false;
                this.dosyaSilinecek = true;
            }
            console.log(this.dosyaSilinecek)
        },
        async KitapSil(Id) {
            this.Id = Id;
            let formData = new FormData();
            //arkadada tutlucak verinin ismi <> arkaya gönderilicek veri
            formData.append('Id', this.Id);
            await $.ajax({
                url: "/Kitap/KitapSil",
                data: formData,
                type: 'POST',
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                cache: false,
                success: function (e) {
                    KitapDataT.ajax.reload(null, false);//Sayfa f5 lenmeden verileri güncelliyor
                },
                error: function (message) {
                    console.log(message)
                }
            });

        },
        async KategoriGetir() {
            await $.ajax({
                url: '/Kitap/KategoriGetAll'
            }).done(data => {
                this.kategoriler = data;
                this.secilenKategori = data[0].id;
            });
        },
        KitapSifirla() {
            this.Id = "";
            this.kitapSeriNo = "";
            this.kitapAdi = "";
            this.KitapYazari = "";
            this.kitapSayfaSayisi = "";
            this.kitapYayinEvi = "";
            this.kitapBasimYili = "";
            this.kitapOzeti = "";
            this.kitapKonusu = "";
            this.kitapStok = "";
            $('#DosyaYoluLink').attr("#");
            $('#DosyaYoluLinkId').text(null);
            $('#dosyaYolu').val(null);
        },
        async KitapTanimla(veri,data) {
            this.kitapButton = true;
            this.Id = await veri.id;
            this.kitapSeriNo = await veri.kitapSeriNo;
            this.kitapAdi = await veri.kitapAdi;
            this.KitapYazari = await veri.kitapYazari;
            this.kitapSayfaSayisi = await veri.kitapSayfaSayisi;
            this.kitapYayinEvi = await veri.kitapYayinEvi;
            this.kitapBasimYili = await veri.kitapBasimYili;
            this.kitapOzeti = await veri.kitapOzeti;
            this.kitapKonusu = await veri.kitapKonusu;
            this.secilenKategori = await veri.kategoriId;
            this.kitapStok = await veri.kitapStok;
            console.log(data)
            if (data != null) {
                this.kitapButton = false;
                
                this.katId = await data[0].KatId;
                this.OdaGetir();
                this.odaId = data[0].OdaId;
                this.KitaplikGetir();
                this.kitaplikId = data[0].KitaplikId;
                this.RafGetir();
                this.rafId = data[0].Id;
            }
            if (veri.kitapResimYolu != null) {
                this.dosyaSil = true;
                this.dosyaVarmı = true;
                $('#DosyaYoluLinkId').attr("href", veri.kitapResimYolu);
                $('#DosyaYoluLinkId').text("1 Yüklü Dosya Bulundu");
            }
            
        },
        async KatGetir() {
            await $.ajax({
                url: '/Raf/KatGetAll'
            }).done(veri => {
                this.katlar = veri;
                this.katId = veri[0].id;
            });
            this.OdaGetir();
        },
        async OdaGetir() {
            var katId = this.katId;
            await $.ajax({
                url: '/Raf/OdaGetAll',
                data: { katId }
            }).done(data => {
                if (data.length > 0) {
                    this.odalar = data;
                    this.odaId = data[0].id;
                }
                else {
                    this.odalar = null;
                }
            });
            this.KitaplikGetir();
        },
        async KitaplikGetir() {
            var OdaId = this.odaId;
            await $.ajax({
                url: '/Raf/KitaplikGetAll',
                data: { OdaId }
            }).done(data => {
                if (data.length > 0) {
                    console.log(data)
                    this.kitapliklar = data;
                    this.kitaplikId = data[0].id;
                }
                else {
                    this.kitapliklar = null;
                }
            });
            this.RafGetir();
        }, 
        async RafGetir() {
            var KitaplikId = this.kitaplikId;
            await $.ajax({
                url: '/Raf/RaflarGetAll',
                data: { KitaplikId }
            }).done(data => {
                if (data.length > 0) {
                    this.raflar = data;
                    this.rafId = data[0].Id;
                }
                else {
                    this.raflar = null;
                }
            });
        },
        async KitapButtonAc() {
            if (this.kitapButton == false) {
                this.kitapButton = true;
            }
            else {
                this.kitapButton = false;
                this.rafId = 0;
            }
        }
    },
    created() {
        this.KategoriGetir();
        this.KatGetir();
        this.OdaGetir();
        this.KitaplikGetir();
        this.RafGetir();
    },
    befourupdate() {
        this.KategoriGetir();
        this.KatGetir();
        this.OdaGetir();
        this.KitaplikGetir();
        this.RafGetir();
    }
});
//#endregion