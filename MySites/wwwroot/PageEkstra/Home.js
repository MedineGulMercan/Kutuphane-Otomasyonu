//#region  Vue
var Vue = new Vue({
    el: "#app",
    data: {
        kitaplar: [],
        sonYorumlar: [],
    },
    methods: {
        async KitapGetir() {
            await $.ajax({
                url: '/Home/KitapGetAll'
            }).done(veri => {
                this.kitaplar = veri;
            });
        },
        async YorumGetir() {
            await $.ajax({
                url: '/Home/YorumGetAll'
            }).done(veri => {
                this.sonYorumlar = veri;
            });
        }
    },
    created() {
        this.KitapGetir();
        this.YorumGetir();
    },
    befourupdate() {
        this.KitapGetir();
        this.YorumGetir();
    }
});
//#endregion