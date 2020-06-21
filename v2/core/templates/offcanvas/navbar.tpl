<nav class="navbar navbar-dark bg-dark navbar-expand-lg fixed-top">
<a class="navbar-brand mr-auto mr-lg-0" href="#">Home</a>
<button class="navbar-toggler p-0 border-0" type="button" data-toggle="offcanvas">
<span class="navbar-toggler-icon"></span>
</button>
<div class="navbar-collapse offcanvas-collapse justify-content-end" id="navbarNav">
<ul class="navbar-nav">
<li class="nav-item"><a class="nav-link active" href="#portfolio">Our Work</a></li>
<li class="nav-item"><a class="nav-link" href="#about">About Us</a></li>
<li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>
</ul>
</div>
</nav>

<!-- offcanvas js -->
<script>
$(function () {
'use strict'
$('[data-toggle="offcanvas"]').on('click', function () {
$('.offcanvas-collapse').toggleClass('open')
})
})
</script>