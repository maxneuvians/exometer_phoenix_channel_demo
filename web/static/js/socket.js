// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "web/static/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/my_app/endpoint.ex":
import {Socket} from "deps/phoenix/web/static/js/phoenix"

let socket = new Socket("/socket", {params: {token: window.userToken}})

socket.connect()

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

$(function () {
  let chart = new Highcharts.Chart({

    chart: {
        renderTo: 'container',
        defaultSeriesType: 'spline'
    },
    title: {
        text: 'Erlang Memory'
    },
    subtitle: {
        text: "Click on series to add or remove"
    },
    xAxis: {
        type: 'datetime',
        tickPixelInterval: 150,
        maxZoom: 20 * 1000
    },
    yAxis: {
        minPadding: 0.2,
        maxPadding: 0.2,
        title: {
            text: 'Bytes',
            margin: 80
        }
    }
  });

  let chart_1 = new Highcharts.Chart({

    chart: {
        renderTo: 'container_1',
        defaultSeriesType: 'spline'
    },
    title: {
        text: 'Erlang Run queue'
    },
    xAxis: {
        type: 'datetime',
        tickPixelInterval: 150,
        maxZoom: 20 * 1000
    },
    yAxis: {
        minPadding: 0.2,
        maxPadding: 0.2,
        title: {
            text: 'Processes',
            margin: 80
        }
    }
  });

  function join_channel(name, target_chart){
    var channel = socket.channel(name, {})
    channel.join()
      .receive("ok", data => {
        console.log("Joined channel", name)
      })
      .receive("error", resp => {
        console.log("Unable to join topic", name)
      })

    channel.on("change", stat => {
      var series = target_chart.get(name)
      var shift = series.data.length > 15
      var point = [stat.timestamp, stat.value]
      series.addPoint(point, true, shift);
    })
  }

  var topics = ["atom", "binary", "ets", "processes", "total"]

  for(var t of topics){
    var topic = "stats:erlang_memory_" + t
    chart.addSeries({id: topic, name: t.capitalize()})
    join_channel(topic, chart)
  }

  var topic = "stats:erlang_statistics_run_queue"
  chart_1.addSeries({id: topic, name: "Run queue"})
  join_channel(topic, chart_1)

});


export default socket
