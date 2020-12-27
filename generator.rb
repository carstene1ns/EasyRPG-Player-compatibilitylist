#!/bin/env ruby

require 'rubygems'
require 'date'
require 'bundler/setup'
require 'yaml'
require 'haml'
require 'tilt'
require 'htmlbeautifier'

Encoding.default_external = "UTF-8"

# basic
@title="EasyRPG Player Compatibility List"
@timestamp = "Updated on " + Time.now().strftime("%B %d, %Y") + "."
@status_text = {
  0 => "Error",
  1 => "not playable",
  2 => "game starts",
  3 => "playable, but problems",
  4 => "completable, but problems",
  5 => "completable"
}

# load external files
@css = File.open("main.css", "r") {|io| io.read}
@js = File.open("accordion.js", "r") {|io| io.read}

# load games
@games = []
print "Processing games"
sorted_games = Dir.glob('games/*.yaml').sort_by(&:downcase)
sorted_games.each do |file|
  # skip game template
  next if file.end_with?("_new_game.yaml")

  game = YAML.load_file(file)
  @games << game
  print "."
end
puts "done"

# load template and render it
template = Tilt.new('template.haml')
list = template.render(self)

# write ugly version
#File.open("haml-output.html", 'w') {|f|
#  f.write(list)
#}

# indent
output = HtmlBeautifier.beautify(list)

# output
File.open("compatibility-list.html", 'w') {|f|
  f.write(output)
}
