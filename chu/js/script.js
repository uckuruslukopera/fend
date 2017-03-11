$(function(){
	$("#navbarToggle").blur(function(event){
		var screenWidth = window.innerWidth;
		if (screenWidth < 768) {
			$("#collapsable-nav").collapse("hide");
		}
	});

// Firefox And Safari : the click event doesn't retain the focus
// Solution: force focus
	$("#navbarToggle").click(function (event) {
		$(event.target).focus();
	});
});

(function(global){
	var dc = {}; //create new fake namespace

	var homeHtml = "snippets/home-snippet.html";
	var allCategoriesUrl = "http://davids-restaurant.herokuapp.com/categories.json";
	var categoriesTitleHtml = "snippets/categories-title-snippet.html";
	var categoryHtml = "snippets/category-snippet.html";
	var menuItemsUrl = "http://davids-restaurant.herokuapp.com/menu_items.json?category=";
	var menuItemsTitleHtml = "snippets/menu-items-title.html";
	var menuItemHtml = "snippets/menu-item.html";

	//helpers
	var insertHtml = function(selector, html){
		var targetElement = document.querySelector(selector);
		targetElement.innerHTML = html;
	};

	var insertProperty = function(string, propName, propValue){
		var propToReplace = "{{" + propName + "}}";
		string = string.replace(new RegExp(propToReplace,"g"),propValue);
		return string;
	};

	//ajax loading gif
	var showLoading = function(selector){
		var html = "<div class='text-center'>";
		html += "<img src='images/ajax-loader.gif'></div>";
		insertHtml(selector,html);
	};

	var switchMenuToActive = function () {
  // Remove 'active' from home button
  var classes = document.querySelector("#navHomeButton").className;
  classes = classes.replace(new RegExp("active", "g"), "");
  document.querySelector("#navHomeButton").className = classes;

  // Add 'active' to menu button if not already there
  classes = document.querySelector("#navMenuButton").className;
  if (classes.indexOf("active") == -1) {
    classes += " active";
    document.querySelector("#navMenuButton").className = classes;
  }
};

	//end of helpers

	document.addEventListener("DOMContentLoaded",function(event){
		//show loading gif
		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(homeHtml,function(responseText){
			insertHtml("#main-content",responseText);
		},false);
	});

	dc.loadMenuCategories = function(){
		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(allCategoriesUrl,buildAndShowCategoriesHTML,true);
	};

	dc.loadMenuItems = function(cat_short_name){
		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(menuItemsUrl + cat_short_name,buildAndShowMenuItemsHTML,true);
	};


	function buildAndShowCategoriesHTML(categories){
		//title html
		$ajaxUtils.sendGetRequest(categoriesTitleHtml,function(categoriesTitleHtml){
			//categories html
			$ajaxUtils.sendGetRequest(categoryHtml,function(categoryHtml){
				switchMenuToActive();
				var categoriesViewHtml = buildCategoriesViewHtml(categories,categoriesTitleHtml,categoryHtml);
				insertHtml("#main-content",categoriesViewHtml);
			},false);
		},false);
	};

	function buildAndShowMenuItemsHTML(menuitems){
		//title html
		$ajaxUtils.sendGetRequest(menuItemsTitleHtml, function(menuItemsTitleHtml){
			//menu items html
			$ajaxUtils.sendGetRequest(menuItemHtml,function(menuItemHtml){
				switchMenuToActive();
				var menuItemsViewHtml = buildMenuItemsViewHtml(menuitems,menuItemsTitleHtml,menuItemHtml);
				insertHtml("#main-content",menuItemsViewHtml);
			},false);
		},false);
	}

	function buildCategoriesViewHtml(categories,categoriesTitleHtml,categoryHtml){
		var finalHtml = categoriesTitleHtml;
		finalHtml += "<section class='row'>";

		for (var i = 0; i < categories.length; i++) {
			var html = categoryHtml;
			var short_name = categories[i].short_name;
			var name = categories[i].name;
			html = insertProperty(html,"name",name);
			html = insertProperty(html,"short_name",short_name);
			finalHtml += html;
		}

		finalHtml += "</section>";
		return finalHtml;
	};

	function buildMenuItemsViewHtml(menuitems,menuItemsTitleHtml,menuItemHtml){
		menuItemsTitleHtml = insertProperty(menuItemsTitleHtml,"name", menuitems.category.name);
		menuItemsTitleHtml = insertProperty(menuItemsTitleHtml,"special_instructions", menuitems.category.special_instructions);

		var finalHtml = menuItemsTitleHtml;
		finalHtml += "<section class='row'>";

		var menu_items = menuitems.menu_items;
		var cat_short_name = menuitems.category.short_name;
		for (var i = 0; i < menu_items.length; i++) {
			var html = menuItemHtml;
			var short_name = menu_items[i].short_name;
			var name = menu_items[i].name;
			var description = menu_items[i].description;
			var price = [
				menu_items[i].price_small, menu_items[i].small_portion_name,
				menu_items[i].price_large, menu_items[i].large_portion_name
			 ];

			html = insertProperty(html,"short_name",short_name);
			html = insertProperty(html,"cat_short_name",cat_short_name);
			html = insertProperty(html,"name",name);
			html = insertProperty(html,"description",description);
			html = insertProperty(html,"price", buildPriceInfo(price));

			if (i % 2 != 0) {
				html += "<div class='clearfix visible-lg-block visible-md-block'></div>";
			}

			finalHtml += html;
		}

		finalHtml += "</section>";
		return finalHtml;

	};

	function buildPriceInfo(price){
		//$10.95<span> (pint)</span> $14.95 <span>(quart)</span>
		var str = "";
		for (var i = 0; i < price.length; i++) {
			if (price[i] != null && i%2 != 0) {
				str += "<span> " + price[i] + "</span> ";
			}
			else if (price[i] != null) {
				str += "$" + price[i].toFixed(2);
			}
			else{
				continue;
			}			
		}
		return str;
	}

	// open fake namesace dc to global
	global.$dc = dc;
})(window);

