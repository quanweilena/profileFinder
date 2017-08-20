$(document).ready(function(){
	$('#searchUser').on('keyup', function(e) {
		let username = e.target.value;

		// make request to github
		$.ajax({
			url: 'https://api.github.com/users/' + username,
			data: {
				client_id: 'd4ba1fd98043e4c120cc',
				client_secret: '88bf89aa58dfeef306c6891ac8c4d76a6c4f0f67'
			},
		}).done(function(user) {
			$.ajax({
				url: 'https://api.github.com/users/' + username + '/repos',
				data: {
				client_id: 'd4ba1fd98043e4c120cc',
				client_secret: '88bf89aa58dfeef306c6891ac8c4d76a6c4f0f67',
				sort: 'created: asc',
				per_page: 5
				},
			}).done(function(repos) {
				$.each(repos, function(index, repo){
					$('#repos').append(`
							<div class="well">
								<div class="row">
									<div class="col-md-7">
										<strong>${repo.name}</strong>: ${repo.description}
									</div>
									<div class="col-md-3">
									<span class="label label-primary">Forks: ${repo.forks_count}</span>
									<span class="label label-success">Watchers: ${repo.watchers_count}</span>
									<span class="label label-warning">Stars: ${repo.stargazers_count}</span>
									</div>
									<div class="col-md-2">
									<a type="button" class="btn btn-danger btn-block" href="${repo.html_url}" target="_blank">View Repo</a>
									</div>
								</div>
							</div>
						`);
				})
			})

			$('#profile').html(`
					<div class="panel panel-default">
					  <div class="panel-heading">
					    <h3 class="panel-title"><strong>${user.name}</strong></h3>
					  </div>
					  <div class="panel-body">
					    <div class="row">
					    <div class="col-md-3">
					    	<img class="thumbnail" src="${user.avatar_url}" style="width: 100%">
					    	<a type="button" class="btn btn-primary btn-block" href="${user.html_url}" target="_blank">View Profile</a>
					    </div>

					    <div class="col-md-9">
					    	<span class="label label-primary">Public repos: ${user.public_repos}</span>
							<span class="label label-success">Public gists: ${user.public_gists}</span>
							<span class="label label-warning">Followers: ${user.followers}</span>
							<span class="label label-danger">Following: ${user.following}</span>
							<br><br>
							<ul class="list-group">
								<li class="list-group-item"><strong>Company:</strong> ${user.company}</li>
								<li class="list-group-item"><strong>Location:</strong> ${user.location}</li>
								<li class="list-group-item"><strong>Blog:</strong> ${user.blog}</li>
								<li class="list-group-item"><strong>Email:</strong> ${user.email}</li>
								<li class="list-group-item"><strong>Bio:</strong> ${user.bio}</li>
								<li class="list-group-item"><strong>Member since:</strong> ${user.created_at}</li>
								<li class="list-group-item"><strong>Last update:</strong> ${user.updated_at}</li>
							</ul>
					    </div>
					    </div>
					  </div>
					</div>

					<h3 class="page-header"><strong>Lasted Repos</strong></h3>
					<div id="repos"></div>
				`);
		});
	});


});