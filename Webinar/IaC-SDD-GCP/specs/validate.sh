#!/usr/bin/env bash
set -euo pipefail

# Variables esperadas:
# PROJECT_ID, ZONE, INSTANCE_NAME, ALLOWED_SSH_CIDR

: "${PROJECT_ID:?PROJECT_ID requerido}"
: "${ZONE:?ZONE requerido}"
: "${INSTANCE_NAME:?INSTANCE_NAME requerido}"
: "${ALLOWED_SSH_CIDR:?ALLOWED_SSH_CIDR requerido}"

# 1) Validar labels obligatorios
labels=$(gcloud compute instances describe "$INSTANCE_NAME" \
  --project "$PROJECT_ID" \
  --zone "$ZONE" \
  --format="json(labels)")

echo "$labels" | jq -e '.labels.owner and .labels.env and .labels.cost_center' >/dev/null

# 2) Validar SSH restringido
rule=$(gcloud compute firewall-rules list \
  --project "$PROJECT_ID" \
  --filter="name~sdd-allow-ssh" \
  --format="json")

echo "$rule" | jq -e ".[0].sourceRanges[] | select(. == \"$ALLOWED_SSH_CIDR\")" >/dev/null

# 3) Validar nginx activo
ip=$(gcloud compute instances describe "$INSTANCE_NAME" \
  --project "$PROJECT_ID" \
  --zone "$ZONE" \
  --format="get(networkInterfaces[0].accessConfigs[0].natIP)")

ssh -o StrictHostKeyChecking=no "ops@${ip}" "systemctl is-active nginx" | grep -q active

echo "OK"
