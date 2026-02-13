import csv, json, re
from collections import Counter, defaultdict
from datetime import datetime
from pathlib import Path

 # <-- update path
CSV_FILE = Path("OurChats.csv")
OUT_JSON = Path("year.json")

START = datetime(2025, 2, 11)
END   = datetime(2026, 2, 9, 23, 59, 59)




def parse_date(s):
    # First try the expected format
    try:
        return datetime.strptime(s, "%Y-%m-%d %I:%M:%S %p")
    except ValueError:
        pass
    
    # Handle common formatting issues with extra digits
    import re
    
    # More comprehensive pattern to handle various malformed dates
    # Extract year, month, day (with potential extra digits), and time
    pattern = r'^(\d{4})-(\d{1,2})-(\d+)(\s+\d{1,2}:\d{2}:\d{2}\s+[AP]M)$'
    match = re.match(pattern, s)
    
    if match:
        year = match.group(1)
        month = match.group(2)
        day_raw = match.group(3)
        time_part = match.group(4)
        
        # Fix the day field
        day = day_raw
        if len(day_raw) > 2:
            # Handle specific corrupted patterns
            if len(day_raw) == 3:
                # Common 3-digit patterns
                if day_raw == '110':  # Should be 11
                    day = '11'
                elif day_raw == '100':  # Should be 10
                    day = '10'
                elif day_raw == '120':  # Should be 12
                    day = '12'
                elif day_raw == '130':  # Should be 13
                    day = '13'
                elif day_raw == '140':  # Should be 14
                    day = '14'
                elif day_raw == '150':  # Should be 15
                    day = '15'
                elif day_raw == '160':  # Should be 16
                    day = '16'
                elif day_raw == '170':  # Should be 17
                    day = '17'
                elif day_raw == '180':  # Should be 18
                    day = '18'
                elif day_raw == '190':  # Should be 19
                    day = '19'
                elif day_raw == '200':  # Should be 20
                    day = '20'
                elif day_raw == '210':  # Should be 21
                    day = '21'
                elif day_raw == '220':  # Should be 22
                    day = '22'
                elif day_raw == '230':  # Should be 23
                    day = '23'
                elif day_raw == '240':  # Should be 24
                    day = '24'
                elif day_raw == '250':  # Should be 25
                    day = '25'
                elif day_raw == '260':  # Should be 26
                    day = '26'
                elif day_raw == '270':  # Should be 27
                    day = '27'
                elif day_raw == '280':  # Should be 28
                    day = '28'
                elif day_raw == '290':  # Should be 29
                    day = '29'
                elif day_raw == '300':  # Should be 30
                    day = '30'
                elif day_raw == '310':  # Should be 31
                    day = '31'
                elif day_raw.startswith('3'):  # 31x -> 31
                    day = '31'
                elif day_raw.startswith('0'):  # Handle 01x, 02x etc.
                    day = day_raw[:2]
                else:
                    # Try first 2 digits if they make sense for a day
                    first_two = day_raw[:2]
                    first_two_int = int(first_two)
                    if 1 <= first_two_int <= 31:
                        day = first_two.zfill(2)
                    else:
                        # Try last 2 digits
                        last_two = day_raw[1:]
                        last_two_int = int(last_two)
                        if 1 <= last_two_int <= 31:
                            day = last_two.zfill(2)
                        else:
                            # Fallback: try to make sense of it
                            day = day_raw[:2]
            else:
                # For longer corrupted days, try first 2 digits
                day = day_raw[:2]
        
        # Ensure day is valid (01-31)
        try:
            day_int = int(day)
            if day_int < 1:
                day = '01'
            elif day_int > 31:
                day = str(day_int)[:2] if len(str(day_int)) > 2 else day
            day = day.zfill(2)  # Ensure 2 digits with leading zero if needed
        except:
            day = '01'  # fallback
        
        # Reconstruct the date string
        fixed_date = f"{year}-{month.zfill(2)}-{day}{time_part}"
        try:
            return datetime.strptime(fixed_date, "%Y-%m-%d %I:%M:%S %p")
        except ValueError:
            pass
    
    # If all else fails, raise the original exception
    raise ValueError(f"Unable to parse date: {s}")

rows = []
skipped_dates = []
parsed_count = 0

with CSV_FILE.open(encoding="utf-8", errors="ignore") as f:
    reader = csv.DictReader(f)
    for r in reader:
        try:
            dt = parse_date(r["Date"])
            parsed_count += 1
        except Exception as e:
            skipped_dates.append(r["Date"])
            continue

        if not (START <= dt <= END):
            continue

        text = (r["Text"] or "").strip()
        if not text or text == "�":
            continue

        sender = "her" if r["Received"] else "me"

        rows.append({
            "ts": dt.isoformat(),
            "sender": sender,
            "text": text
        })

print(f"Parsed {parsed_count} dates successfully")
print(f"Skipped {len(skipped_dates)} unparseable dates")
if skipped_dates:
    print(f"Sample skipped dates: {skipped_dates[:5]}")
print(f"Found {len(rows)} messages in target date range")

# ---- word normalization ----
WORD_MAPPINGS = {
    'love': 'love',
    'loved': 'love',
    'lovee': 'love',
    'loveee': 'love',
    'lovely': 'love',
    'lover': 'love',
    'chapuna': 'chapuna',
    'chapune': 'chapuna',
    'chapoopoo': 'chapuna',
    'chapunaing': 'chapuna',
    'chapunaa': 'chapuna',
}

def normalize_word(word):
    return WORD_MAPPINGS.get(word, word)

# ---- stats ----
total = len(rows)
by_person = Counter(r["sender"] for r in rows)
by_month = defaultdict(int)
by_day = defaultdict(int)
by_hour = defaultdict(int)
top_words = Counter()
emoji_count = Counter()

for r in rows:
    dt = datetime.fromisoformat(r["ts"])
    by_month[f"{dt.year}-{dt.month:02d}"] += 1
    by_day[dt.date().isoformat()] += 1
    by_hour[dt.hour] += 1
    
    # Count words
    for w in re.findall(r"[a-zA-Z']{3,}", r["text"].lower()):
        normalized_w = normalize_word(w)
        top_words[normalized_w] += 1
    
    # Count emojis (simple regex for common emojis)
    for emoji in re.findall(r'[😀-🙏💀-🗿🚀-🛿🤀-🥿🦀-🧿⚀-⚿]|:\)|:\(|:D|<3', r["text"]):
        emoji_count[emoji] += 1

# Find busiest day
busiest_day = max(by_day.items(), key=lambda x: x[1]) if by_day else ("", 0)

# Find longest streak of consecutive days with messages
sorted_days = sorted([datetime.fromisoformat(day).date() for day in by_day.keys()])
longest_streak = 0
current_streak = 1
streak_start = None
streak_end = None
longest_streak_start = None
longest_streak_end = None

if len(sorted_days) > 1:
    current_start = sorted_days[0]
    for i in range(1, len(sorted_days)):
        if (sorted_days[i] - sorted_days[i-1]).days == 1:
            current_streak += 1
        else:
            if current_streak > longest_streak:
                longest_streak = current_streak
                longest_streak_start = current_start
                longest_streak_end = sorted_days[i-1]
            current_streak = 1
            current_start = sorted_days[i]
    
    # Check final streak
    if current_streak > longest_streak:
        longest_streak = current_streak
        longest_streak_start = current_start
        longest_streak_end = sorted_days[-1]

# Find most popular hour
most_popular_hour = max(by_hour.items(), key=lambda x: x[1])[0] if by_hour else 0

# Format hour range
def format_hour_range(hour):
    start_12h = datetime.strptime(str(hour), "%H").strftime("%I %p").lstrip('0')
    end_hour = (hour + 1) % 24
    end_12h = datetime.strptime(str(end_hour), "%H").strftime("%I %p").lstrip('0')
    return f"{start_12h} - {end_12h}"

out = {
    "range": {
    "start": START.date().isoformat(),
    "end": END.date().isoformat()
    },
    "total_messages": total,
    "by_person": dict(by_person),
    "messages_by_month": [
        {"month": k, "count": by_month[k]} for k in sorted(by_month)
    ],
    "top_words": [
        {"word": w, "count": c} for w, c in top_words.most_common(40)
    ],
    "special_words": {
        "chapuna": top_words.get("chapuna", 0),
        "love": top_words.get("love", 0)
    },
    "busiest_day": {
        "date": busiest_day[0],
        "count": busiest_day[1]
    },
    "longest_streak": {
        "days": longest_streak,
        "start": longest_streak_start.isoformat() if longest_streak_start else None,
        "end": longest_streak_end.isoformat() if longest_streak_end else None
    },
    "most_used_emoji": {
        "emoji": emoji_count.most_common(1)[0][0] if emoji_count else "😊",
        "count": emoji_count.most_common(1)[0][1] if emoji_count else 0
    },
    "most_popular_hour": {
        "hour": most_popular_hour,
        "formatted": format_hour_range(most_popular_hour),
        "count": by_hour[most_popular_hour]
    },
    "sample_quotes": [
        r for r in rows if len(r["text"]) > 40
    ][:20]
}

OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
OUT_JSON.write_text(json.dumps(out, indent=2), encoding="utf-8")

print("Wrote", OUT_JSON)
