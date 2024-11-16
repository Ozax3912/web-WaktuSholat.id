// ambil waktu secara reall

const getDate = new Date();
const getYear = getDate.getFullYear();
const getMont = getDate.getMonth() + 1;
const getDay = getDate.getDate();

function bulan(){
      if(getMont < 10 ){
            bulan = `0${getMont}`;
      } else{
            bulan = getMont
      }
      return bulan
}

function hari(){
      if (getDay < 10) {
            hari = `0${getDay}`;
      } else {
            hari = getDay;
      }
      return hari;
}

const tanggal = `${getYear}-${bulan()}-${hari()}`;

const tampilKota = document.querySelector('.judul-kota');
tampilKota.textContent = localStorage.judulkota;

function displayTime(){
      var clientTime=new Date();
      var time=new Date(clientTime.getTime());
      var sh=time.getHours().toString();
      var sm=time.getMinutes().toString();
      var ss=time.getSeconds().toString();
    document.getElementById("jam").innerHTML=(sh.length==1?"0"+sh:sh)+":"+(sm.length==1?"0"+sm:sm)+":"+(ss.length==1?"0"+ss:ss);
}

const jam_sekarang = `${jam}`

function JadwalWaktuSholat() {
      fetch("https://api.myquran.com/v2/sholat/jadwal/" + parseInt(localStorage.idkota) + "/" + tanggal)
      .then(Response => Response.json())
      .then(data => {
            const jadwal = data.data.jadwal
            document.querySelector('.imsak').textContent = jadwal.imsak;
            document.querySelector('.subuh').textContent = jadwal.subuh;
            document.querySelector('.terbit').textContent = jadwal.terbit;
            document.querySelector('.dzuhur').textContent = jadwal.dzuhur;
            document.querySelector('.ashar').textContent = jadwal.ashar;
            document.querySelector('.maghrib').textContent = jadwal.maghrib;
            document.querySelector('.isya').textContent = jadwal.isya;
            document.querySelector('.tanggal').textContent = jadwal.tanggal;

       // Atur jadwal waktu adzan otomatis berdasarkan waktu sholat
       scheduleAdzan(jadwal);  
       // Fungsi untuk memutar suara adzan dengan notifikasi
function playAdzanWithNotification(audioElement) {
      const userConfirmed = confirm("Adzan akan segera dimulai. Apakah Anda ingin mematikannya?");
      if (!userConfirmed) {
          audioElement.play();
      }
}
       // Fungsi untuk memutar suara adzan pada waktu tertentu
function scheduleAdzan(jadwal) {
      const times = {
          subuh: jadwal.subuh,
          dzuhur: jadwal.dzuhur,
          ashar: jadwal.ashar,
          maghrib: jadwal.maghrib,
          isya: jadwal.isya
      };
  
      const audioElement = document.getElementById("adzan_audio");

    // Periksa waktu setiap detik untuk memutar suara adzan
    setInterval(() => {
        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        // Cek apakah waktu sekarang sesuai dengan waktu sholat
        if (Object.values(times).includes(currentTime)) {
            playAdzan(audioElement);
        }
    }, 1000); // Periksa setiap 1 detik
}

// Fungsi untuk memutar suara adzan
function playAdzan(audioElement) {
    audioElement.play();
}    
      });
}    

document.addEventListener("DOMContentLoaded", () => {
      const ellipsisButton = document.querySelector(".ellipsis-button");
      const descriptionBox = document.querySelector(".description-box");
    
      // Toggle visibility of description box on button click
      ellipsisButton.addEventListener("click", () => {
        descriptionBox.classList.toggle("active");
      });
    
      // Close description box when clicking outside
      document.addEventListener("click", (event) => {
        if (!ellipsisButton.contains(event.target) && !descriptionBox.contains(event.target)) {
          descriptionBox.classList.remove("active");
        }
      });
    });

// pilih lokasi
const inputSearch = document.querySelector('.input-search');
const cardlist = document.querySelector('.card-list');

inputSearch.addEventListener('keyup', function (){
      const valueSearch = inputSearch.value.length;

      if(valueSearch > 0){
            cardlist.classList.remove('hidden-list');
            
            fetch('https://api.myquran.com/v2/sholat/kota/semua')
               .then(response => response.json())
               .then(response => {
                  const Data = response.data;
                  let listdata = '';
                  Data.forEach( d => {
                        listdata += `<a href="#" data-idkota=" ${d.id}" id="nama-kota" class="list-group-item list-group-item-action">${d.lokasi}</a>`;

                  });
                  const lokasidata = document.querySelector('.card-list');
                  lokasidata.innerHTML = listdata;

                  // ketika kota di klik
                  const isikota = document.querySelectorAll('#nama-kota');
                  isikota.forEach( kota => {

                        const filterText = inputSearch.value.toLowerCase();
                        const itemText = kota.firstChild.textContent.toLowerCase();

                        if(itemText.indexOf(filterText) != -1 ){
                              kota.setAttribute("style", "display: block");
                        } else {
                              kota.setAttribute("style", "display: none !important");
                        }

                        kota.addEventListener('click', function(){
                              const idkota = this.dataset.idkota;
                              const Judulkota = this.textContent;
                              window.localStorage.setItem('idkota', idkota);
                              window.localStorage.setItem('judulkota', Judulkota);
                              lokasidata.classList.add('hidden-list');
                              inputSearch.value = '';
                              location.reload();
                              alert(`Kota ${judulKota} berhasil dipilih`);
                        });
                  });
            });



      } else {
            cardlist.classList.add('hidden-list');
           
      }
});




JadwalWaktuSholat();    

