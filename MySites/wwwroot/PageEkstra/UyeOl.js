//#region  Vue 
var vue = new Vue({
    el: "#UyeApp",
    data: {
        sifre: "",
        isim: "",
        soyisim: "",
        dt: "",
        tc: "",
        mail: "",
        telefon: "",
        adres: "",
        teliki: ""
    },
    methods: {
        async UyeOl() { 
            let formData = new FormData();
            //arkadada tutlucak verinin ismi <> arkaya gönderilicek veri -- ön taraftan(vue'den aldığı veriyi (this.x) entity deki isime gönderiyoruz. )
            formData.append('Isim', this.isim );
            formData.append('Soyisim', this.soyisim);
            formData.append('DT', this.dt);
            formData.append('TC', this.tc);
            formData.append('Mail', this.mail);
            formData.append('Telefon', this.telefon);
            formData.append('Adres', this.adres);
            formData.append('Teliki', this.teliki);
            formData.append('Sifre', this.sifre);
            //var Isim = this.isim;
            //var Soyisim = this.soyisim;
            //var DT = this.dt;
            //var TC = this.t;
            //var Mail = this.mail;
            //var Telefon = this.telefon;
            //var Adres = this.adres;
            //var Teliki = this.teliki;
            //var entity = { Isim, Soyisim, DT, TC, Mail, Telefon, Adres, Teliki };
            await $.ajax({
                url: "/KullaniciLogin/UyeOlustur",
                data: formData,
                type: 'POST',
                enctype: 'multipart/form-data',
                processData: false,
                contentType: false,
                cache: false,
                success: function (e) {
                    $('#UyeOlModal').modal('hide');
                },
                error: function (message) {
                    console.log(message)
                }
            });
            this.Sifirla();
        },
        async Sifirla() {
            this.sifre = await "";
            this.isim = await "";
            this.soyisim = await "";
            this.dt = await "";
            this.tc = await "";
            this.mail = await "";
            this.telefon = await "";
            this.adres = await "";
            this.teliki = await "";
        }
    },
    created() {
        
    },
    befourupdate() {
        
    }
});
//#endregion