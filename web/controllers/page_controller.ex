defmodule ExometerPhoenixChannelDemo.PageController do
  use ExometerPhoenixChannelDemo.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
