toggleSide = () => {
    let navSide = document.getElementById("navBar");
    navSide.classList.toggle("open");
    let navLayer = document.getElementById("nav_layer");
    navLayer.classList.toggle("open");
 }


function mediaJs(x) {
    let lang_join = $('.lang_join')
    let top_wrapper = $(".lang_col")
    let dropUser = $("#dropUser")
    let user_nav = $(".user_nav")

    if (x.matches) {
        $('.navBar').append(lang_join , dropUser)
    } else {
        top_wrapper.append(lang_join);
        user_nav.append(dropUser);
        
    }
}

var x = window.matchMedia("(max-width: 992px)")
mediaJs(x)
x.addListener(mediaJs)
