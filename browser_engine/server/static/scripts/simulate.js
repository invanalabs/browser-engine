// A $( document ).ready() block.
$(document).ready(function () {
    console.log("ready!");


    var header_template = "" +
        "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3809.100 Safari/517.36\n" +
        "Cookies:\n" +
        "- name: user.expires_at\n" +
        "  value: xxxxxx\n" +
        "  domain: www.example.com\n" +
        "Referer: null\n" +
        "Proxy: null\n";

    var simulation_code = "" +
        "def simulate(driver=None):\n" +
        "    import random\n" +
        "    driver.switch_to.default_content()\n" +
        "    driver.implicitly_wait(random.randint(0, 2))\n" +
        "    print ('Successfully waited for sometime')";


    var traversals_template = "" +
        "- traversal_id: default_traversal\n" +
        "  selector: \"a\"\n" +
        "  selector_type: css\n" +
        "  selector_attribute: href\n" +
        "  data_type: ListStringField\n" +
        "  max_requests: 500\n" +
        "  next_spider_id: default_spider";

    $('[name="headers"]').html(header_template);
    $('[name="simulation_code"]').html(simulation_code);
    $('[name="traversals"]').html(traversals_template);


    var url_template = "https://invanalabs.ai";
    $('[name="url"]').val(url_template);


    function simulate_loading() {
        $("#response-viewer").html("<p class='text-muted'>loading ...</p>");
        $("#response-img").attr("src", "");

    }

    $(".header-form").submit(function (e) {


        e.preventDefault();


        simulate_loading();

        var url = $(".header-form [name='url']").val();

        // options here
        var timeout = $(".header-form [name='timeout']").val();
        var viewport = $(".header-form [name='viewport']").val();
        var take_screenshot = $(".header-form [name='take_screenshot']").is(":checked");

        if (take_screenshot === true) {
            take_screenshot = 1
        } else {
            take_screenshot = 0;
        }

        // payload here
        var headers = $("#form [name='headers']").val();
        var traversals = $("#form [name='traversals']").val();
        var simulation_type = $("#form [name='simulation_type']").val();
        var simulation_code = $("#form [name='simulation_code']").val();


        let params = (new URL(document.location)).searchParams;
        let token = params.get("token");
        console.log("url", url);
        var body = {
            "headers": headers,
            // "traversals": traversals,
            "simulations": {
                "default_simulation": {
                    "simulation_type": simulation_type,
                    "simulation_code": simulation_code
                }
            }
        };
        console.log("bodybody", body);

        $.ajax({
            type: 'POST',
            url: "/execute?url=" + url + "&timeout=" + timeout + "&viewport=" + viewport
                + "&token=" + token + "&take_screenshot=" + take_screenshot,
            data: JSON.stringify(body),
            contentType: "application/json",
            dataType: 'json'
        })
            .done(function (data) {
                console.log(data);
                data['response']['html'] = "< =truncated= >";
                var screenshot = data['response']['screenshot'];
                $("#response-viewer").html(JSON.stringify(data, null, 4));
                $("#response-img").attr("src", "data:image/png;base64," + screenshot);
            })
            .fail(function (error) {
                console.error(error);
            })
            .always(function () {
                // called after done or fail
            });
    })
});