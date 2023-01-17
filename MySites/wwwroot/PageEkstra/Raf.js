//#region BugünüÇeker
var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today1 = now.getFullYear() + "-" + (month) + "-" + (day);
//#endregion

//bu fonksiyon sayfa her yenilendiğinde içindeki kodları çalıştırır.
$(document).ready(function () {
    RafTableGetir();
});

var RafDataT;

function RafTableGetir() {
    RafDataT = $("#RafTable").DataTable({
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
            url: "/Raf/RafGetAll",
            type: "GET",
            datatype: "json",
            dataSrc: "",
        },
        buttons: [
            {
                extend: 'excelHtml5',
                //columns'da excellde hangi kolonların görünür olmasını istediğimizi ayarlıyoruz.
                exportOptions: { columns: [3, 5, 7, 9] },
                orientation: 'landscape',
                className: "btn btn-success",
                title: today1 + ' Raflar ', //inen excellin başlığıx
            },
            {
                extend: 'pdfHtml5',
                exportOptions: { columns: [':visible'] }, // colums visible tabloda görünen tüm kolonları pdf te gösteriyor.
                orientation: 'landscape',
                className: "btn btn-danger",
                pageSize: 'A3',
                title: today1 + ' Raflar ',
            },
            {
                extend: 'pageLength',
                orientation: 'landscape',
                className: "btn btn-info",
            },
            {

                extend: 'colvis',
                columns: [3,5,7,9],
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
                    return '<button class="btn btn-success Duzenle">Düzenleme</button>'
                }
            },                                   //0
            {
                data: "Id", render: function (data, type, row) {
                    return '<button class="btn btn-danger Sil">Sil</button>'
                }
            },                                   //1       
            { data: "Id" },                      //2
            { data: "RafAdi" },                  //3
            { data: "KitaplikId" },              //4 
            { data: "KitaplikAdi" },             //5
            { data: "OdaId" },                   //6
            { data: "OdaAdi" },                  //7
            { data: "KatId" },                   //8 
            { data: "KatAdi" },                  //9 
            { data: "AktifMi" },                 //10



        ],
        columnDefs: [
            {
                //ön  tarafta gözükmesini istemediğimiz kolonları burda false yaparız.Arkada görünür ama tasarımda görünmez.
                targets: [2, 4, 6, 8, 10],
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
    $("#RafTable tbody").on("click", ".Duzenle", async function () {
        var veri = RafDataT.row($(this).parents("tr")).data(); //tıklanan satırın içindeki verileri "veri" değişkenine atar.
        await Vue.RafDuzenle(veri);
    });
    $("#RafTable tbody").on("click", ".Sil", async function () {
        var veri = RafDataT.row($(this).parents("tr")).data(); //tıklanan satırın içindeki verileri "veri" değişkenine atar.
        await Vue.RafSil(veri.Id);
    });
}
//#region  Vue
var Vue = new Vue({
    el: "#app",
    data: {
        Id: "",
        katId: "",
        odaId: "",
        kitaplikId: "",
        rafAdi: "",
        aktifMi: "",
        katlar: [],
        odalar: [],
        kitapliklar: [],
    },
    methods: {
        async RafEkle() {
            var Id = this.Id;
            if (Id != 0) {
                let formData = new FormData();
                formData.append("Id", this.Id);
                formData.append("KatId", this.katId);
                formData.append("OdaId", this.odaId);
                formData.append("KitaplikId", this.kitaplikId);
                formData.append("RafAdi", this.rafAdi);
                formData.append("AktifMi", this.aktifMi);

                await $.ajax({ //ajax ı arkaya post atmak için kullanıyoruz.
                    url: "/Raf/RafGuncelle",
                    data: formData,
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function (e) {
                        $('#RafModal').modal('hide'); // her kaydete basılıp kayıt başarılı olduğunda(success) pop-up ı kapat.
                        RafDataT.ajax.reload(null, false);//Sayfa f5 lenmeden verileri güncelliyor.  içine null , false yazmazsak . sayfadaysak bizi . sayfaya atıyor.
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
                formData.append("KitaplikId", this.kitaplikId);
                formData.append("RafAdi", this.rafAdi);
                await $.ajax({ //ajax ı arkaya post atmak için kullanıyoruz.
                    url: "/Raf/RafEkle",
                    data: formData,
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function (e) {
                        $('#RafModal').modal('hide'); // her kaydete basılıp kayıt başarılı olduğunda(success) pop-up ı kapat.
                        RafDataT.ajax.reload(null, false);//Sayfa f5 lenmeden verileri güncelliyor.  içine null , false yazmazsak . sayfadaysak bizi . sayfaya atıyor.
                    },
                    error: function (message) {
                        console.log(message)
                    }
                });
            }
        },
        async RafDuzenle(raflar) {
            this.Id = await raflar.Id;
            this.katId = await raflar.KatId
            await this.OdaGetir();
            this.odaId = await raflar.OdaId;
            await this.KitaplikGetir();
            this.kitaplikId = await raflar.KitaplikId;
            this.rafAdi = await raflar.RafAdi;
            this.aktifMi = await raflar.AktifMi;
            $('#RafModal').modal('show');
        },
        async sifirla() {
            this.Id = "";
            this.rafAdi = "";
            this.aktifMi = "";
        },
        async RafSil(Id) {
            let formData = new FormData();
            formData.append("Id", Id);
            await $.ajax({ //ajax ı arkaya post atmak için kullanıyoruz.
                url: "/Raf/RafAktiflikSil",
                data: formData,
                type: 'POST',
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                cache: false,
                success: function (e) {
                    RafDataT.ajax.reload(null, false);//Sayfa f5 lenmeden verileri güncelliyor.  içine null , false yazmazsak . sayfadaysak bizi . sayfaya atıyor.
                },
                error: function (message) {
                    console.log(message)
                }
            });
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
                    this.kitapliklar = data;
                    this.kitaplikId = data[0].id;
                }
                else {
                    this.kitapliklar = null;
                }
            });
        }
    },
    async created() {
        await this.KatGetir();
        await this.OdaGetir();
        await this.KitaplikGetir();
    },
    befourupdate() {
        this.KatGetir();
        this.OdaGetir();
        this.KitaplikGetir();
    }
});

//#endregion