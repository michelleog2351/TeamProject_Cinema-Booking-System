function footer() {
  var footerOutPut = `
    <hr>
    <div class="text-center text-white py-5"> 
      &copy; Applied Computing Group 1
    </div>
    <a href="#" class="fa fa-facebook"></a>
    <a href="#" class="fa fa-twitter"></a>`;

  $("#footer").addClass("bg-primary").html(footerOutPut);
}
