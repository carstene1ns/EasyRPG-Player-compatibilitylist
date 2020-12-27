# GNU Makefile

# what we want to generate
COMPATLIST	:= compatibility-list.html
# input files
TPL			:= template.haml
GEN			:= generator.rb
CSS			:= main.css
JS			:= accordion.js
GAMES		:= games/*.yaml

.PHONY: clean all

$(COMPATLIST): Gemfile.lock $(TPL) $(GEN) $(CSS) $(JS) $(GAMES)
	@echo "Running haml/generator:"
	@ruby $(GEN)
	@echo "Generated \"$@\"."

all: $(COMPATLIST)

clean:
	rm -f $(COMPATLIST)

Gemfile.lock: Gemfile
	bundle install

new:
	@ruby new-game.rb

count:
	@echo "There are $(shell ls $(GAMES) | wc -l) games in the list."
