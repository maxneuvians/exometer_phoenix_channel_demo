use Mix.Config

polling_interval = 1_000
memory_stats     = ~w(atom binary ets processes total)a

config :exometer,
  predefined:
    [
      {
        ~w(erlang memory)a,
        {:function, :erlang, :memory, [], :proplist, memory_stats},
        []
      },
      {
        ~w(erlang statistics)a,
        {:function, :erlang, :statistics, [:'$dp'], :value, [:run_queue]},
        []
      },
    ],
  reporters:
    [
      "Elixir.ExometerReportPhoenixChannel": [
        app_name: "ExometerPhoenixChannelDemo",
        channel: "stats"
      ],
    ],

  report: [
    subscribers:
      [
        {
          :"Elixir.ExometerReportPhoenixChannel",
          [:erlang, :memory], memory_stats, polling_interval, true
        },
        {
          :"Elixir.ExometerReportPhoenixChannel",
          [:erlang, :statistics], :run_queue, polling_interval, true
        }
      ]
  ]
