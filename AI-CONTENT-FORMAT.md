# KI-Inhalte für das Lernportal

Dieses Format ist die gemeinsame Schnittstelle zwischen ChatGPT und dem Lernportal. Ziel: Arbeitsblätter/Fotos/PDFs analysieren lassen, ein komplettes Lernpaket erzeugen und dieses unter **Inhalte verwalten → KI / JSON** importieren.

## Master-Prompt

> Erstelle aus den bereitgestellten Lernunterlagen ein Lernpaket für das Lernportal `Christian1Binder/realschule`. Gib ausschließlich valides JSON nach Schema-Version 2 aus. Passe Sprache und Schwierigkeit an die angegebene Jahrgangsstufe und Schulart an. Das Paket braucht eine präzise Zusammenfassung, Lernkarten und prüfungsnahe Multiple-Choice-Fragen. Eine Lernkarte darf auf Vorder- und Rückseite Text enthalten. Bei didaktischem Nutzen darf sie zusätzlich ein Bild und/oder eine Tabelle enthalten. Erfinde keine Bildpfade. Wenn kein bereits vorhandener Bildpfad genannt wurde, lasse `image` weg. Tabellen werden strukturiert als `headers` und `rows` ausgegeben. Jede Quizfrage hat genau vier Antwortmöglichkeiten, einen nullbasierten `answerIndex` und eine kurze Erklärung.

## Schema-Version 2

```json
{
  "schemaVersion": 2,
  "grade": 7,
  "subject": "Kunst",
  "topic": {
    "id": "romanik",
    "title": "Romanik",
    "summary": [
      "Die Romanik ist eine Kunstepoche des Mittelalters."
    ],
    "flashcards": [
      {
        "front": {
          "text": "Woran erkennt man eine romanische Kirche?",
          "image": {
            "src": "assets/images/romanik/kirche.jpg",
            "alt": "Romanische Kirche mit Rundbogenfenstern",
            "caption": "Beispiel einer romanischen Kirche"
          }
        },
        "back": {
          "text": "An massiven Mauern, kleinen Fenstern und Rundbögen.",
          "table": {
            "headers": ["Merkmal", "Romanik"],
            "rows": [
              ["Bogen", "Rundbogen"],
              ["Fenster", "klein"]
            ]
          }
        }
      }
    ],
    "quiz": [
      {
        "question": "Welcher Bogen ist typisch für die Romanik?",
        "choices": ["Rundbogen", "Spitzbogen", "Flachbogen", "Korbbogen"],
        "answerIndex": 0,
        "explanation": "Der Rundbogen ist ein wichtiges Erkennungsmerkmal der Romanik."
      }
    ]
  }
}
```

## Kompatibilität

Alte Lernkarten mit `{ "q": "...", "a": "..." }` bleiben lesbar. Neue Karten verwenden bevorzugt `front` und `back`. Bilder können über eine öffentliche URL oder einen relativen Repository-Pfad eingebunden werden. Tabellen werden direkt auf der Karte gerendert.

## Import

Der Import akzeptiert entweder ein einzelnes Lernpaket (`topic`) oder ein vollständiges Fach-JSON (`topics`). Bei einem Lernpaket wird ein vorhandenes Thema mit derselben ID bzw. demselben Titel ersetzt; alle anderen Themen bleiben erhalten. Danach wird das vollständige Fach-JSON exportiert und kann die Datei unter `data/grade-<Klasse>/<fach>.json` ersetzen.