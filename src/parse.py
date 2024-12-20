from json import load

with open("cka.json", "r", encoding="utf-8") as f:
    data = load(f)
    with open("cka_ans.html", "w", encoding="utf-8") as w:
        w.write(data["answersHtml"]["1.31"])
