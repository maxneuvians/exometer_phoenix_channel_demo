defmodule ExometerPhoenixChannelDemo.StatChannel do
  use ExometerPhoenixChannelDemo.Web, :channel

  def join("stats:" <> stat, _payload, socket) do
    {:ok, "Joined Stats:#{stat}", socket}
  end

  def handle_out(event, payload, socket) do
    push socket, event, payload
    {:noreply, socket}
  end
end
