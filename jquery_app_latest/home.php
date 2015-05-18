<!-- TODO:
	Migrate existing functionality from MVC App
	Remove Add Apartment
	Refactor MVC usage
	Replace relevant JS with jQuery
	Create separate form/map views that can be toggled after a zipcode search
	User accounts for loading existing results tables
	Keep MySQL, PHP for this iteration
	Create Rails or Node backend for next version
-->
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>Compare Apartments in Your Area | AptBrowse</title>
		<link rel="icon" type="image/ico" href="favicon.ico">
		<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<!-- Latest compiled and minified CSS -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css">
		<!-- Latest compiled and minified JavaScript -->
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
		<!-- Google Fonts -->
		<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,600,800' rel='stylesheet' type='text/css'>
		<!-- Colors CSS for a more modern color palette -->
		<link rel="stylesheet" href="mrmrs-colors-4703de3/css/colors.css">
		<!-- Custom CSS -->
		<link rel="stylesheet" href="styles.css">
		<!-- MVC and initialization scripts -->
		<script type="text/javascript" src="models.js" defer></script>
		<script type="text/javascript" src="views.js" defer></script>
		<script type="text/javascript" src="controllers.js" defer></script>	
		<script type="text/javascript" src="starter.js" defer></script>
		<!-- Google's Maps API Places Library -->
		<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?libraries=places"></script>
		<link rel="stylesheet" href="http://css-spinners.com/css/spinners.css" type="text/css">
	</head>
	<body>
		<div class="navigationMenu">
		    <nav id="topBar" class="navbar navbar-default" role="navigation">
		        <!-- Group toggle and menu for mobile displays -->
		        <div class="container">
		            <div class="navbar-header">
		                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
		                    <span class="sr-only">Toggle navigation</span>
		                    <span class="icon-bar"></span>
		                    <span class="icon-bar"></span>
		                    <span class="icon-bar"></span>
		                </button>
		                <a id="home" class="navbar-brand" href="#">AptBrowse</a>
		            </div>
		            <!-- User, Admin, and Account submenus -->
		            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		                <ul class="nav navbar-nav">
		                    <li class="dropdown">
		                        <a href="#" data-toggle="dropdown" class="dropdown-toggle" role="button" aria-expanded="false">User<b class="caret"></b></a>
		                        <ul class="dropdown-menu" role="menu" aria-labelledby="dlabel">
		                            <li><a id="save" href="#">Save Form</a></li>
		                            <li><a href="#">Load Form</a></li>
		                            <li><a href="#">Clear Form</a></li>
		                        </ul>
		                    </li>
		                    <li class="dropdown">
		                        <a href="#" data-toggle="dropdown" class="dropdown-toggle" role="button" aria-expanded="false">Admin<b class="caret"></b></a>
		                        <ul class="dropdown-menu" role="menu" aria-labelledby="dlabel">
		                            <li><a id="initDB" href="#">Init DB</a></li>
		                            <li><a id="clearDB" href="#">Clear DB</a></li>
		                        </ul>
		                    </li>
		                </ul>  
		                <ul class="nav navbar-nav navbar-right">
		                	<li id="registerMenu" class="dropdown">
								<a class="dropdown-toggle" href="#" data-toggle="dropdown">Sign Up <strong class="caret"></strong></a>
								<div class="dropdown-menu" style="padding: 15px; padding-bottom: 0px;">
									<div style="text-align:center"><span class="glyphicon glyphicon-heart"></span></div>
									<br>
									<p class="signUpInText">Register Here:</p>						
									<form method="post" action="login" accept-charset="UTF-8">
										<input style="margin-bottom: 15px;" type="text" placeholder="Username" id="usernameR" name="username">
										<input style="margin-bottom: 15px;" type="password" placeholder="Password" id="passwordR" name="password">
										<input style="margin-bottom: 15px;" type="password" placeholder="Confirm Password" id="passwordR2" name="password">
										<div style="text-align:center"><a id="registerBtn" href="#" class="btn btn-info">Register</a></div>       		
									</form>
									<br>
								</div>
							</li>
		                	<li id="loginMenu" class="dropdown">
								<a class="dropdown-toggle" href="#" data-toggle="dropdown">Sign In <strong class="caret"></strong></a>
								<div class="dropdown-menu" style="padding: 15px; padding-bottom: 0px;">
									<div style="text-align:center"><span class="glyphicon glyphicon-thumbs-up"></span></div>
									<br>
									<p class="signUpInText">Welcome Back!</p>	
									<form method="post" action="login" accept-charset="UTF-8">
										<input style="margin-bottom: 15px;" type="text" placeholder="Username" id="usernameL" name="username">
										<input style="margin-bottom: 15px;" type="password" placeholder="Password" id="passwordL" name="password">
										<div style="text-align:center"><a id="loginBtn" href="#" class="btn btn-info">Sign In</a></div>
									</form>
									<br>
							</div>
							</li>
		                </ul>
		            </div>
		        </div>
		    </nav>
		</div>
		<!-- Large searchbar for immediate zip code searching. Will be cleared out when search is run -->
		<div class="content">
			<div class="searchContent">
				<div id="spinner"  style="display: none;">
					<br>
					<div id="spinnerCenter" class="dots-loader">Loading...</div>
				</div>
				<div class="search">
					<div class="container">
						<div class="row">
							<div class="col-md-3"></div>
					        <div class="col-md-6">
					    		<h2>Apartment Search</h2>          	
					           		<div class="input-group">
					                    <input type="text" class="form-control input-lg zipSearch" placeholder="Enter your zipcode here" />
					                    <span class="input-group-btn">
					                        <button class="btn btn-info btn-lg zipSearchBtn" type="button">
					                            <i class="glyphicon glyphicon-search"></i>
					                        </button>
					                    </span>
					                </div>          
					        </div>
					        <div class="col-md-3"></div>
						</div>
					</div>
				</div>
				<!-- Section for zip search output including map and form views, which can be toggled-->
				<div class="break"><br></div>
				<div class="ftablebodyDiv">
					<table class="table" id="ftable" style="table-layout: auto">
						<tbody class="ftablebody">
						</tbody>
					</table>
				</div>
				<!-- Required Google Maps API element -->
				<div id="map"></div>
				<!-- Required Google logo and general links for the site -->
				<div id="footer">
					<img src="powered-by-google-on-white.png" />
				</div>
			</div>
		</div>
	</body>
</html>
