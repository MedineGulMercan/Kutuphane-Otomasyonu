$(document).ready(function () {
});
//#region  Vue
var Vue = new Vue({
    el: "#app",
    data: {
        id:"",
        kitap: {},
        yorum: "",
        yorumlar: [],
    },
    methods: {
        async KitapGetir() {
            var Id = this.id;
            await $.ajax({
                url: '/KitapAyrinti/KitapGetir',
                data: { Id }
            }).done(veri => {
                this.kitap = veri[0];
                console.log(this.kitap)
            });
        },
        async YorumYap() {
            let formData = new FormData();
            formData.append('Metin', this.yorum);
            formData.append('KitapId', this.id);
            await $.ajax({
                url: "/KitapAyrinti/YorumEkle",
                data: formData,
                type: 'POST',
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                cache: false,
                success: function (e) {
                    $('#YorumModal').modal('hide');
                },
                error: function (message) {
                    console.log(message)
                }
            });
            this.YorumGetir();
        },
        async Sil(Id) {
            let formData = new FormData();
            formData.append('Id', Id);
            await $.ajax({
                url: "/KitapAyrinti/YorumSil",
                data: formData,
                type: 'POST',
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                cache: false,
                success: function (e) {
                },
                error: function (message) {
                    console.log(message)
                }
            });
            this.YorumGetir();
        },
        async YorumGetir() {
            var Id = this.id;
            await $.ajax({
                url: '/KitapAyrinti/YorumGetAll',
                data: { Id }
            }).done(veri => {
                this.yorumlar = veri;
            });
        },
    },
    mounted() {
        this.id = document.getElementById("gelenId").value;
        this.KitapGetir();
        this.YorumGetir();
    }
});
//#endregion