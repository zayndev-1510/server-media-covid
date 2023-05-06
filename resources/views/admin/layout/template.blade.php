<!doctype html>
<html class="no-js" lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>SISTEM INFORMASI AKADEMIK TK</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" type="image/png" href="{{ asset('assets/images/icon/icon website.png') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/font-awesome.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/themify-icons.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/metisMenu.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/slicknav.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/design.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/slick/dist/assets/owl.carousel.min.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/slick/dist/assets/owl.theme.green.min.css') }}">

    <!-- amchart css -->
    <link rel="stylesheet" href="https://www.amcharts.com/lib/3/plugins/export/export.css" type="text/css"
        media="all" />
    <!-- others css -->
    <link rel="stylesheet" type="text/css"
        href="{{ asset('assets/datatable/DataTables-1.11.5/css/jquery.dataTables.css') }}">

    <link rel="stylesheet" type="text/css"
        href="{{ asset('assets/datatable/DataTables-1.11.5/css/dataTables.bootstrap4.min.css') }}">
    <link rel="stylesheet" type="text/css"
        href="{{ asset('assets/datatable/Responsive-2.2.9/css/responsive.bootstrap.min.css') }}">
    <link rel="stylesheet" type="text/css"
        href="{{ asset('assets/datatable/Responsive-2.2.9/css/responsive.jqueryui.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/typography.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/default-css.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/styles.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/responsive.css') }}">
    <!-- modernizr css -->
    <script src="{{ asset('assets/js/vendor/jquery-2.2.4.min.js') }}"></script>

    <script src="{{ asset('assets/js/popper.min.js') }}"></script>
    <script src="{{ asset('assets/js/bootstrap.min.js') }}"></script>
    <script src="{{ asset('assets/js/metisMenu.min.js') }}"></script>
    <script src="{{ asset('assets/js/jquery.slimscroll.min.js') }}"></script>
    <script src="{{ asset('assets/js/jquery.slicknav.min.js') }}"></script>


    <!-- start chart js -->
    <script src="{{ asset('assets/datatable/DataTables-1.11.5/js/jquery.dataTables.js') }}"></script>
    <script src="{{ asset('assets/datatable/DataTables-1.11.5/js/dataTables.bootstrap4.min.js') }}"></script>
    <script src="{{ asset('assets/datatable/Responsive-2.2.9/js/dataTables.responsive.min.js') }}"></script>
    <script src="{{ asset('assets/datatable/Responsive-2.2.9/js/responsive.bootstrap.min.js') }}"></script>
    <script src="{{ asset('assets/js/vendor/modernizr-2.8.3.min.js') }}"></script>
</head>

<body>
    <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
    <!-- preloader area start -->
    <div id="preloader">
        <div class="loader"></div>
    </div>
    <!-- preloader area end -->
    <!-- page container area start -->
    <div class="page-container">
        <!-- sidebar menu area start -->
        <div class="sidebar-menu" style="background-color: #483D8B;color:white;">
            <div class="sidebar-header" style="background-color: #483D8B;color:white;">
                <div class="logo">
                    <p style="color: white;font-weight: bolder;">SIAKAD TK/RA AL MUSLIHUN</p>

                </div>
            </div>
            <div class="main-menu">
                <div class="menu-inner">
                    <nav>
                        <ul class="metismenu" id="menu">
                            <li>
                                <a href="{{ url('admin/page/dashboard') }}" aria-expanded="true"><i
                                        class="ti-dashboard"></i><span>dashboard</span></a>
                            </li>
                            <li>
                                <a href="javascript:void(0)" aria-expanded="true"><i
                                        class="ti-layout-sidebar-left"></i><span>Data Master
                                    </span></a>
                                <ul class="collapse">
                                    <li><a href="{{ url('admin/page/sekolah') }}">
                                            <i class="ti-home"></i>
                                            <span>Identitas Sekolah</span></a></li>
                                    <li>
                                        <a href="{{ url('admin/page/tahun-akademik') }}">
                                            <i class="ti-calendar"></i>
                                            <span>Tahun Akademik</span></a>
                                    </li>
                                    <li>
                                        <a href="{{ url('admin/page/ruangan') }}">
                                            <i class="ti-user"></i>
                                            <span>Ruangan</span></a>
                                    </li>
                            </li>
                        </ul>
                        </li>

                        <li>
                            <a href="#" aria-expanded="true"><i class="ti-user"></i><span> Data Pengguna
                                </span></a>
                            <ul class="collapse">
                                <li><a href="{{ url('admin/page/guru') }}">
                                        <i class="ti-user" aria-hidden="true"></i>
                                        <span>Guru</span></a></li>
                                <li>
                                <li>
                                    <a href="{{ url('admin/page/pengajar') }}" aria-expanded="true">
                                        <i class="ti-user"></i><span> Pengajar </span></a>
                                </li>
                                <li>
                                    <a href="{{ url('admin/page/orangtua') }}" aria-expanded="true">
                                        <i class="ti-user"></i><span> Orang Tua </span></a>
                                </li>
                                <li>
                                    <a href="{{ url('admin/page/siswa') }}" aria-expanded="true">
                                        <i class="ti-user"></i><span> Siswa </span></a>
                                </li>
                                <li>
                                    <a href="{{ url('admin/page/kepala-sekolah') }}" aria-expanded="true">
                                        <i class="ti-user"></i><span> Kepala Sekolah </span></a>
                                </li>
                                <li>
                                    <a href="{{ url('admin/page/siswa') }}" aria-expanded="true">
                                        
                                        <i class="ti-user"></i><span> Administrator </span></a>
                                </li>
                                <li>
                                    <a href="{{ url('admin/page/pengguna') }}" aria-expanded="true">
                                        
                                        <i class="ti-user"></i><span> Pengguna </span></a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" aria-expanded="true"><i class="ti-calendar"></i><span> Data Akademik
                                </span></a>
                            <ul class="collapse">
                                <li><a href="{{ url('admin/page/mapel') }}">
                                        <i class="ti-book" aria-hidden="true"></i>
                                        <span>Mata Pelajaran</span></a></li>
                                <li>
                                <li>
                                    <a href="{{ url('admin/page/jadwal') }}" aria-expanded="true">
                                        <i class="ti-calendar"></i><span> Jadwal Matpel </span></a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="{{ url('admin/page/calon-siswa') }}" aria-expanded="true"><i class="ti-user"></i><span>Data Pendaftaran
                                </span></a>
                            </ul>
                        </li>

                        </ul>
                    </nav>
                </div>
            </div>
        </div>
        <!-- sidebar menu area end -->
        <!-- main content area start -->
        <div class="main-content">
            <!-- header area start -->
            <div class="header-area">
                <div class="row align-items-center">
                    <!-- nav and search button -->
                    <div class="col-md-6 col-sm-8 clearfix">
                        <div class="nav-btn pull-left">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div class="search-box pull-left">

                        </div>
                    </div>
                    <!-- profile info & task notification -->
                    <div class="col-md-6 col-sm-4 clearfix">
                        <ul class="notification-area pull-right">

                            <li class="dropdown">
                                <i class="ti-bell dropdown-toggle" data-toggle="dropdown">

                                </i>
                                <div class="dropdown-menu bell-notify-box notify-box">
                                    <span class="notify-title">You have 3 new notifications <a href="#">
                                            view all</a></span>
                                    <div class="nofity-list" style="background-color: red;o">
                                        <a href="#" class="notify-item">
                                            <div class="notify-thumb"><i class="ti-key btn-danger"></i></div>
                                            <div class="notify-text">
                                                <p>You have Changed Your Password</p>
                                                <span>Just Now</span>
                                            </div>
                                        </a>
                                        <a href="#" class="notify-item">
                                            <div class="notify-thumb"><i class="ti-comments-smiley btn-info"></i>
                                            </div>
                                            <div class="notify-text">
                                                <p>New Commetns On Post</p>
                                                <span>30 Seconds ago</span>
                                            </div>
                                        </a>
                                        <a href="#" class="notify-item">
                                            <div class="notify-thumb"><i class="ti-key btn-primary"></i></div>
                                            <div class="notify-text">
                                                <p>Some special like you</p>
                                                <span>Just Now</span>
                                            </div>
                                        </a>
                                        <a href="#" class="notify-item">
                                            <div class="notify-thumb"><i class="ti-comments-smiley btn-info"></i>
                                            </div>
                                            <div class="notify-text">
                                                <p>New Commetns On Post</p>
                                                <span>30 Seconds ago</span>
                                            </div>
                                        </a>
                                        <a href="#" class="notify-item">
                                            <div class="notify-thumb"><i class="ti-key btn-primary"></i></div>
                                            <div class="notify-text">
                                                <p>Some special like you</p>
                                                <span>Just Now</span>
                                            </div>
                                        </a>
                                        <a href="#" class="notify-item">
                                            <div class="notify-thumb"><i class="ti-key btn-danger"></i></div>
                                            <div class="notify-text">
                                                <p>You have Changed Your Password</p>
                                                <span>Just Now</span>
                                            </div>
                                        </a>
                                        <a href="#" class="notify-item">
                                            <div class="notify-thumb"><i class="ti-key btn-danger"></i></div>
                                            <div class="notify-text">
                                                <p>You have Changed Your Password</p>
                                                <span>Just Now</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </li>
                            <li class="settings-btn">
                                <i class="ti-settings"></i>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- header area end -->
            <!-- page title area start -->
            <div class="page-title-area">
                <div class="row align-items-center">
                    @yield('header-lvl-1')

                    <div class="col-sm-6 clearfix">
                        <div class="user-profile pull-right">
                            <img class="avatar user-thumb" src="{{ asset('akun/' . $datalogin[0]->foto) }}"
                                alt="avatar">
                            <h4 class="user-name dropdown-toggle" data-toggle="dropdown">
                                {{ $datalogin[0]->nama_lengkap }}
                                <i class="fa fa-angle-down"></i>
                            </h4>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="{{ url('admin/logout') }}">Log Out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- page title area end -->
            @yield('content')
        </div>
        <!-- main content area end -->
        <!-- footer area start-->
        <footer>
            <div class="footer-area">
                <p>© Copyright 2018. All right reserved. Template by <a href="">IT KREATIF</a>.</p>
            </div>
        </footer>
        <!-- footer area end-->
    </div>


    <!-- all line chart activation -->
  
    <!-- others plugins -->
    <script src="{{ asset('assets/js/plugins.js') }}"></script>
    <script src="{{ asset('assets/js/scripts.js') }}"></script>

    @yield('javascript')
</body>

</html>
