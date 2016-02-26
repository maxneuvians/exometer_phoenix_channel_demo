defmodule ExometerReportPhoenixChannel do
  @behaviour :exometer_report

  # Initializes the exometer_report with passed params
  # Requires :channel and :app_name options
  def exometer_init(opts) do
    {:ok, opts}
  end

  # Converts the data passed by Exometer and relays it to the channel
  def exometer_report(metric, data_point, extra, value, opts) do
    id = opts[:channel] <> ":" <> name(metric, data_point)

    payload = %{
      value: value,
      extra: extra,
      timestamp: :os.system_time(:milli_seconds)
    }

    Module.concat([opts[:app_name], Endpoint])
    |> apply(:broadcast, [id, "change", payload])

    {:ok, opts}
  end

  # Public function that should be implemented according to
  # https://github.com/Feuerlabs/exometer_core/blob/master/src/exometer_report_tty.erl
  def exometer_call(_, _, opts), do: {:ok, opts}
  def exometer_cast(_, opts), do: {:ok, opts}
  def exometer_info(_, opts), do: {:ok, opts}
  def exometer_newentry(_, opts), do: {:ok, opts}
  def exometer_setopts(_, _, _, opts), do: {:ok, opts}
  def exometer_terminate(_, _), do: nil

  defp name(metric, data_point) do
    Enum.join(metric, "_") <> "_" <> "#{data_point}"
  end
end
