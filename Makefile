TEMPLATE = _src/pandoc_template.html
SRC_DIR = _src
OUT_DIR = projects

POSTS = marathon receiver-fan-automation

all: $(POSTS:%=$(OUT_DIR)/%.html)

$(OUT_DIR)/%.html: $(SRC_DIR)/%.md $(TEMPLATE)
	pandoc $< -o $@ -s --section-divs --toc --toc-depth=2 --template=$(TEMPLATE)

clean:
	rm -f $(POSTS:%=$(OUT_DIR)/%.html)

.PHONY: all clean
