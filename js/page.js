function buildTabs()
{
    var content = "";
    for ( var i = 0; i < tabs.length; ++i )
        {
            content += '<a href="' + tabs[i].url + '">';
            content += '<div class="sub-header-item">' + tabs[i].text + '</div>';
            content += '</a>';
        }

        $('#sub-header').html(content);

}

function buildCategories()
{
    var content = "";
    var toc = "<h2>Categories</h2><ul>";
    for ( var i = 0; i < categories.length; ++i )
    {
        content += "<div class='category'>"
        content += '<h2><a class="category-anchor" name="'+ categories[i].code +'">' + categories[i].title + '</a></h2>';
        content += "<label>" + categories[i].description + "</label>"

        toc += "<li><a href='#"+ categories[i].code + "' class='nav-anchor'>" + categories[i].title + "</a></li>"

        for ( var j = 0; j < categories[i].repos.length; ++j )
            {
                var repoName = categories[i].repos[j];
                content += '<div class="repo-list-item-container">';
                content += '<a href="'+ repos[repoName]['html_url']  + '" class="repo-list-item-anchor">'+ repoName.replace( /([a-z])([A-Z])/g, "$1 $2").replace( /[\-_]/g, " ") +'</a>';
                content += '<div class="repo-list-item-description">' + repos[repoName].description+ '</div>'
                content +='<div><span class="repo-list-item-label">Language: </span><span class="repo-list-item-value">' + repos[repoName].language+ '</span></div>';
                content +='<div><span class="repo-list-item-label">Updated: </span><span class="repo-list-item-value">' + jQuery.format.prettyDate(repos[repoName].updated_at)+ '</span></div>';

                content +='<div><span class="repo-list-item-label">Forks: </span><span class="repo-list-item-value">' + repos[repoName].forks+ '</span></div>';
                content +='<div><span class="repo-list-item-label">Open Issues: </span><span class="repo-list-item-value">' + repos[repoName].open_issues+ '</span></div>';
                content +='</div>'
            }
        content += "</div>"
    }

    $('#categories').html(content);
    $('#categoryList').html(toc + "</ul>");

    $(".repo-list-item-description").dotdotdot({

    });

}
var repos = {};

$(function(){
    buildTabs();


    $.ajax({
        url: "https://api.github.com/orgs/interactiveintelligence/repos",
    })
    .done(function( data ) {

        for(var x=0; x< data.length; x++)
        {
            repos[data[x].name] = data[x];
        }
        buildCategories();
    });
});