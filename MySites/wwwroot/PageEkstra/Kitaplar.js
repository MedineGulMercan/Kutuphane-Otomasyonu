//#region  Vue
var Vue = new Vue({
    el: "#app",
    data: {
        kategoriId: 0,
        kitaplar: [],
        Kategoriler: [],
    },
    methods: {
        async KitapGetir() {
            var Id = this.kategoriId;
            await $.ajax({
                url: '/Kitaplar/KitapGetAll',
                data: { Id }
            }).done(veri => {
                this.kitaplar = veri;
            });
        },
        async KategorileriGetir() {
            await $.ajax({
                url: '/Kitaplar/KategoriGetAll'
            }).done(veri => {
                this.Kategoriler = veri;
            });
        },
        async KategoriyeGoreGetir(Id) {
            this.kategoriId = Id;
            this.KitapGetir();
        }
    },
    created() {
        this.KitapGetir();
        this.KategorileriGetir();
    },
    befourupdate() {
        this.KitapGetir();
        this.KategorileriGetir();
    }
});
//#endregion