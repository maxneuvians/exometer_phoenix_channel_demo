defmodule ExostatHelper do

  def count do
    acc = fn {channel, _}, map -> Map.update(map, channel, 1, &(&1 + 1)) end
    :ets.foldl(acc, %{}, ExometerPhoenixChannelDemo.PubSub.Local0)
  end

  def random(_) do
    :random.seed(:erlang.timestamp)
    [value_1: :random.uniform, value_2: :random.uniform, value_3: :random.uniform]
  end

end
