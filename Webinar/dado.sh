#!/usr/bin/env bash
set -euo pipefail

# Simple dice roll animation in the terminal.
frames=(
"[o     ]"
"[ o    ]"
"[  o   ]"
"[   o  ]"
"[    o ]"
"[     o]"
)

rolls=12
for ((i=0; i<rolls; i++)); do
  frame=${frames[$((i % ${#frames[@]}))]}
  printf "\rLanzando dado %s" "$frame"
  sleep 0.07
done

result=$(( (RANDOM % 6) + 1 ))

faces=(
"+-------+\n|       |\n|   o   |\n|       |\n+-------+"
"+-------+\n| o     |\n|       |\n|     o |\n+-------+"
"+-------+\n| o     |\n|   o   |\n|     o |\n+-------+"
"+-------+\n| o   o |\n|       |\n| o   o |\n+-------+"
"+-------+\n| o   o |\n|   o   |\n| o   o |\n+-------+"
"+-------+\n| o   o |\n| o   o |\n| o   o |\n+-------+"
)

printf "\rResultado: %d       \n" "$result"
printf "%b\n" "${faces[$((result - 1))]}"
