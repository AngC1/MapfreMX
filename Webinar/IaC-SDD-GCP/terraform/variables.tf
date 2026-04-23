variable "project_id" {
  type = string
}

variable "region" {
  type    = string
  default = "us-central1"
}

variable "zone" {
  type    = string
  default = "us-central1-a"
}

variable "env" {
  type = string
}

variable "owner" {
  type = string
}

variable "cost_center" {
  type = string
}

variable "allowed_ssh_cidr" {
  type    = string
  default = "10.0.0.0/24"
}

variable "network_cidr" {
  type    = string
  default = "10.10.0.0/16"
}

variable "subnet_cidr" {
  type    = string
  default = "10.10.1.0/24"
}

variable "machine_type" {
  type    = string
  default = "e2-medium"
}

variable "ops_ssh_public_key" {
  type = string
}
