# Variáveis
CONTAINER_NAME = $(shell docker ps --filter "name=laravel.test" --format "{{.Names}}")
ARTISAN = docker exec -it $(CONTAINER_NAME) php artisan

# Comandos
.PHONY: help mig appointment up down install check-vendor

help: ## Mostra todos os comandos disponíveis
	@echo "Comandos disponíveis:"
	@echo "  make mig          - Executa as migrations, recria o banco e executa seeders"
	@echo "  make appointment  - Insere um novo agendamento"
	@echo "  make up           - Levanta o ambiente de desenvolvimento"
	@echo "  make down         - Para o ambiente de desenvolvimento"
	@echo "  make install      - Instala as dependências do Composer"

check-vendor:
	@if [ ! -d "vendor" ]; then \
		echo "Pasta vendor não encontrada. Instalando dependências..."; \
		docker run --rm -v $(PWD):/app composer install; \
	fi

mig: check-vendor ## Executa as migrations
	$(ARTISAN) migrate:fresh --seed

appointment: ## Insere um novo agendamento
	@echo "Inserindo agendamento..."
	@curl -X POST http://localhost:8080/api/appointments \
	-H "Content-Type: application/json" \
	-d '{"doctor_id": "$(doctor_id)", "patient_id": "$(patient_id)", "appointment_date": "$(date)", "status": "$(status)"}'

up: check-vendor ## Levanta o ambiente
	@echo "Verificando .env e database.sqlite..."
	@if [ ! -f ".env" ]; then \
		echo "Arquivo .env não encontrado. Copiando .env.example para .env..."; \
		cp .env.example .env; \
	fi
	@if [ ! -f "database/database.sqlite" ]; then \
		echo "Arquivo database.sqlite não encontrado. Criando..."; \
		touch database/database.sqlite; \
	fi
	@echo "Levantando o ambiente de desenvolvimento..."
	@if [ -f "./vendor/bin/sail" ]; then \
		./vendor/bin/sail up -d; \
	else \
		docker compose up -d; \
	fi

down: ## Para o ambiente
	@echo "Parando o ambiente de desenvolvimento..."
	@if [ -f "./vendor/bin/sail" ]; then \
		./vendor/bin/sail down; \
	else \
		docker compose down; \
	fi

install: check-vendor ## Instala as dependências do Composer
	@echo "Instalando dependências do Composer..."
	docker exec $(CONTAINER_NAME) composer install
