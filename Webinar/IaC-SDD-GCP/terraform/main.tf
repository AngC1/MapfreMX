locals {
  labels = {
    owner       = var.owner
    env         = var.env
    cost_center = var.cost_center
  }
}

resource "google_compute_network" "vpc" {
  name                    = "sdd-vpc-${var.env}"
  auto_create_subnetworks = false
  labels                  = local.labels
}

resource "google_compute_subnetwork" "private" {
  name          = "sdd-subnet-${var.env}"
  region        = var.region
  network       = google_compute_network.vpc.id
  ip_cidr_range = var.subnet_cidr
  labels        = local.labels
}

resource "google_compute_firewall" "allow_ssh" {
  name    = "sdd-allow-ssh-${var.env}"
  network = google_compute_network.vpc.name
  labels  = local.labels

  allow {
    protocol = "tcp"
    ports    = ["22"]
  }

  source_ranges = [var.allowed_ssh_cidr]
  target_tags   = ["ssh"]
}

resource "google_compute_instance" "app" {
  name         = "sdd-vm-${var.env}"
  machine_type = var.machine_type
  zone         = var.zone
  labels       = local.labels
  tags         = ["ssh"]

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-12"
    }
  }

  network_interface {
    subnetwork = google_compute_subnetwork.private.name
    access_config {}
  }

  metadata = {
    "ssh-keys" = "ops:${var.ops_ssh_public_key}"
  }
}
