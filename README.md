# HODER — agenda DEMO

Samodzielna strona demonstracyjna spotkania zespołu **15–18 stycznia 2027**. Wszystkie osoby, program i obiekt są fikcyjne. Nie jest zaproszeniem, rejestracją ani rzeczywistą rezerwacją. Rok 2027 jest przyjętym rokiem dla prezentacji.

## Uruchomienie
Otwórz `index.html` w przeglądarce lub uruchom lokalny serwer:

    python3 -m http.server 8080

Następnie otwórz `http://localhost:8080`. Brak instalacji, kompilacji i zależności. Zawartość tego katalogu można opublikować bezpośrednio przez GitHub Pages. Wszystkie ścieżki są względne. `.nojekyll` wyłącza niepotrzebne przetwarzanie Jekyll.

## Funkcje
- 24 fikcyjne punkty programu rozłożone na cztery dni.
- Wybór dnia, wszystkie dni, wyszukiwanie oraz filtrowanie kategorii.
- Osobista agenda zapisywana lokalnie; odporność na niedostępny lub uszkodzony localStorage.
- Szczegóły punktów w dostępnym oknie dialogowym; obsługa Escape, klawiatury i widocznego fokusu.
- Eksport wszystkich zapisanych punktów do `.ics`, niezależny od aktywnych filtrów.
- Kalendarz: Europe/Warsaw, w styczniu UTC+1; znaczniki czasu eksportowane w UTC. Tytuły oznaczone `[DEMO]`, zdarzenia wstępne, bez blokowania dostępności.
- Druk aktualnego widoku programu. Aby wydrukować całość, wybierz „Cały program”, „Wszystkie dni” i wyczyść filtry.
- Responsywny układ, ograniczenie ruchu, FAQ, informacja o prywatności, usunięcie zapisanych wyborów.

## Dane i prywatność
Strona nie zawiera analityki, zewnętrznych fontów, pikseli śledzących ani formularzy. Nie łączy się z ERP ani innymi systemami firmy. Wybrane identyfikatory sesji są zapisywane wyłącznie w localStorage pod kluczem `hoder-agenda-demo-2027-v1`. Hosting może prowadzić własne standardowe logi dostępu. Rysunek gór jest oryginalnym SVG, a znak HODER prostym tekstowym wordmarkiem na potrzeby demonstracji.

## Pliki
- `index.html`: struktura i informacje demonstracyjne.
- `styles.css`: responsywny wygląd, druk i dostępność.
- `app.js`: dane, interakcje i eksport kalendarza.
- `favicon.svg`: lokalna ikona.

Dane programu edytuje się w tablicy `sessions` w `app.js`. Publikacja nie nastąpiła w ramach tworzenia plików.

## Testy
- `node --check app.js` — kontrola składni JavaScript.
- `node test-logic.cjs` — testy logiki bez dodatkowych zależności (Node.js). Sprawdza 24 sesje, unikalne identyfikatory, filtrowanie, zapis, uszkodzoną/niedostępną pamięć oraz format i strefę czasową ICS.
- `node test-demo.cjs` — testy interfejsu z Playwright i Chromium dostępnym pod `/usr/bin/chromium`. W razie potrzeby dostosuj ścieżkę przeglądarki. Tworzy zrzuty `qa-desktop.png` i `qa-mobile.png`.

W środowisku tworzenia testy składni i logiki przeszły. Pełne testy przeglądarkowe i zrzuty ekranu nie zostały wykonane: uruchomienie Chromium zostało zatrzymane przez ograniczenie gniazd systemowych (`socket: Operation not permitted`). Plik testu jest przygotowany do uruchomienia w środowisku z działającą przeglądarką. Strona nie wymaga plików testowych do publikacji.
