# Lernportal für Ella 🎓

Ein modernes, responsives Lern-Webportal für eine Schülerin (Realschule Bayern) für die Klassen 5–10, mit Fokus auf die **7. Jahrgangsstufe** als MVP (Minimum Viable Product).

Das Projekt ist komplett in Vanilla HTML, CSS und JavaScript geschrieben und kommt **ohne Node.js, ohne npm und ohne Build-Tools** aus. Es ist darauf ausgelegt, sofort statisch auf **GitHub Pages** zu funktionieren.

## Projektidee
Das Lernportal bietet Fächer mit verschiedenen Themenbereichen an. Jedes Thema besteht aus drei Formaten:
1. **Zusammenfassung** (Text/Listen)
2. **Lernkarten** (Flashcards zum Umdrehen)
3. **Quiz** (Multiple Choice mit Feedback und Score)

Die Inhalte werden dynamisch aus JSON-Dateien im Ordner `/data/` geladen, sodass keine Datenbank benötigt wird. Fortschritte im Quiz werden lokal im Browser (`localStorage`) gespeichert.

## Lokales Starten
Da die Inhalte über JavaScript (`fetch`) geladen werden, blockieren viele Browser das Laden von lokalen Dateien (`file://...`) aus Sicherheitsgründen (CORS).

**Empfohlen:**
Starte einen simplen lokalen Server. Wenn du VS Code nutzt, installiere die Erweiterung **Live Server** und klicke auf "Go Live".
Alternativ im Terminal (falls Python installiert ist):
```bash
python -m http.server 8000
```
Öffne dann `http://localhost:8000` im Browser.

## Struktur
```
/
  index.html            # Landingpage
  impressum.html        # Impressum
  assets/               # CSS, JS
  grade/                # Jahrgangsstufen-Ordner (5-10)
    7/                  # MVP-Inhalte Klasse 7
      subject/          # HTML-Seiten für jedes Fach
  data/                 # JSON-Dateien mit Lerninhalten
  server/               # Platzhalter für zukünftiges PHP-Backend
```

## Inhalte bearbeiten (JSON)
Die Inhalte befinden sich in `/data/grade-7/`. Wenn du einen Text, eine Lernkarte oder ein Quiz ändern möchtest, öffne einfach die entsprechende JSON-Datei in einem Texteditor und passe die Daten an.

Das Format ist standardisiert:
```json
{
  "title": "Thema-Titel",
  "summary": ["Satz 1", "Satz 2"],
  "flashcards": [ {"q": "Frage", "a": "Antwort"} ],
  "quiz": [ {"question": "?", "choices": ["A", "B", "C"], "answerIndex": 0, "explanation": "!"} ]
}
```

## Export aus dem Editor (MVP)
Auf jeder Fachseite gibt es oben rechts einen Button "Inhalte hinzufügen (Beta)".
- Dies öffnet ein Formular.
- Wenn du auf "JSON exportieren" klickst, wird das neue Thema an den bestehenden Inhalt angehängt und als Datei heruntergeladen.
- **Für GitHub Pages:** Überschreibe einfach die alte JSON-Datei im Ordner `/data/` mit der heruntergeladenen Datei und lade die Änderung auf GitHub hoch (Commit/Push).

## Upgrade-Pfad zu PHP
Das Portal funktioniert aktuell komplett statisch (Frontend + JSON).
Wenn in Zukunft ein echtes Backend gewünscht ist, bei dem Inhalte direkt aus dem Browser gespeichert werden sollen, ohne Dateien manuell zu ersetzen:
1. Das Verzeichnis `/server/api/` enthält bereits Platzhalter-Dateien (`load-content.php`, `save-content.php`).
2. Diese Skripte können später so programmiert werden, dass sie POST-Anfragen des Editors entgegennehmen und die JSON-Dateien auf dem Server überschreiben.
3. Für das MVP auf GitHub Pages sind diese Dateien *nicht* aktiv und stören den statischen Ablauf nicht.
