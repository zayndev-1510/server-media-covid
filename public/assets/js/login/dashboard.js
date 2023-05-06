/*jshint esversion: 6 */
var app = angular.module("homeApp", ["ngRoute"]);

function random_rgba() {
    var o = Math.round,
        r = Math.random,
        s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
}

app.controller("homeController", function ($scope, service) {
    var fun = $scope;
    var service = service;
    var tahun_akademik = [];
    var data_siswa = [];
    var data_warna = [];
	var labelkelas=[];
	var data_siswa_bykelas=[];
    service.grafikSiswa(row => {
        const a = row.a;
        const b = row.b;
		const c=row.c;
        for (var i in a) {
            data_siswa.push(a[i].jumlah);
            tahun_akademik.push(a[i].ket);
            data_warna.push(random_rgba());
        }

		for (var i in c){
			data_siswa_bykelas.push(c[i].jumlah);
			labelkelas.push(c[i].ket);
			data_warna.push(random_rgba());
		}

        var options = {
			legend: {
				display: false
			},
			tooltips: {
				callbacks: {
				  label: function(tooltipItem, data) {
					return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + ' Orang';
				  }
				}
			  },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
        var datakelamin = {
            labels: ["Laki-laki", "Perempuan"],
            datasets: [{
                label: "Grafik Data Siswa Berdasarkan Jenis Kelamin",
                data: [b.L, b.P],
                backgroundColor: [
                    'rgb(121, 133, 222)',
                    'rgb(233, 96, 52)',
                ],
                borderColor: [
                    'rgba(121, 133, 222)',
                    'rgb(233, 96, 52)',
                ],
                borderWidth:1
            }]
        }
		var datakelasbysiswa = {
            labels: labelkelas,
            datasets: [{
                data: data_siswa_bykelas,
                backgroundColor: [
                    'rgb(38, 148, 70)',
                    'rgb(233, 96, 52)',
                ],
                borderColor: [
                    'rgba(38, 148, 70)',
                    'rgb(233, 96, 52)',
                ],
                borderWidth:1
            }]
        }
        var datagrafiksiswa = {
            labels: tahun_akademik,
            datasets: [{
                data: data_siswa,
                backgroundColor: data_warna,
                borderColor: data_warna,
                borderWidth: 1
            }]
        }

		var mychart=document.getElementById("myChart").getContext("2d");
		var mychart2=document.getElementById("myChart2").getContext("2d");
		var mychart3=document.getElementById("myChart3").getContext("2d");
		
		var grafiksiswall=new Chart(mychart,{
			type:'bar',
			data:datagrafiksiswa,
			options:options,
			plugins: {
				datalabels: {
				  color: '#616161',
					display:false
				}
			  }
		});
		var grafiksiswajk=new Chart(mychart2,{
			type:'pie',
			data:datakelamin,
			options: {
                tooltips: {
                  callbacks: {
                    label: function(tooltipItem, data) {
                      return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + ' Orang';
                    }
                  }
                }
			},
			plugins: {
				datalabels: {
				  color: 'white',
				  display: true, 
				},
			  },
		})
		var grafiksiswakelas=new Chart(mychart3,{
			type:'pie',
			data:datakelasbysiswa,
			options: {
                tooltips: {
                  callbacks: {
                    label: function(tooltipItem, data) {
                      return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + ' Orang';
                    }
                  }
                }
			},
			plugins: {
				datalabels: {
				  color: 'white',
				  display: true, 
				},
			  },
		})

		
    });

});
