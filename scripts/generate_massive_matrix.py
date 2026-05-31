import os
import itertools
from openai import OpenAI

# Initialize client pointing to your local Hermes runner
client = OpenAI(
    base_url="http://localhost:11434/v1", 
    api_key="hermes-local-token"
)

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_DIR = os.path.join(BASE_DIR, "data", "generated-content")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# =====================================================================
# DYNAMIC DICTIONARY ENGINE (Generates 100 Services, 100 Industries, 250 Cities)
# =====================================================================

# 1. Base components to generate 100 Realistic Technical Agency Services
service_actions = ["Migration", "Optimization", "Architecture Audit", "Infrastructure Engineering", "Refactoring", "Integration Pipeline", "API Layer Design", "State Architecture Tuning", "Deployment Automation", "Performance Overhaul"]
service_techs = ["Next.js", "React 19", "TypeScript Core", "Tailwind Engine", "Headless CMS", "GraphQL Mesh", "Server Component (RSC)", "Turbopack Build", "Edge Runtime", "PostgreSQL Layer"]

SERVICES = []
id_counter = 1
for action in service_actions:
    for tech in service_techs:
        slug = f"{tech.lower().replace(' ', '-').replace('.', '')}-{action.lower().replace(' ', '-')}"
        name = f"Enterprise {tech} {action}"
        pain = f"unoptimized bundle distribution splits, blocking {tech} rendering states, and high latency performance overhead."
        SERVICES.append({"id": id_counter, "slug": slug, "name": name, "pain": pain})
        id_counter += 1

# 2. Base components to generate 100 High-Value Commercial Industries
ind_types = ["B2B SaaS", "E-Commerce", "Fintech", "HealthTech", "Logistics", "EdTech", "InsurTech", "MarTech", "PropTech", "CleanTech"]
ind_sectors = ["Platforms", "Enterprise Systems", "Distributed Applications", "Global Ecosystems", "Networks", "Analytics Dashboards", "Cloud Services", "Operations Frameworks", "Infrastructure", "Portals"]

INDUSTRIES = []
id_counter = 1
for itype in ind_types:
    for sector in ind_sectors:
        slug = f"{itype.lower().replace(' ', '-')}-{sector.lower().replace(' ', '-')}"
        name = f"{itype} {sector}"
        INDUSTRIES.append({"id": id_counter, "slug": slug, "name": name})
        id_counter += 1

# 3. Base components to generate 250 Major Regional Locations/Tech Hubs
# For a real pipeline, replace this seed loop with an array containing your 250 target cities.
states = ["TX", "CA", "NY", "FL", "NC", "CO", "GA", "WA", "MA", "IL"]
city_prefixes = ["North", "South", "East", "West", "Central", "Metro", "New", "Greater", "Old", "Port"]
city_bases = ["Austin", "San Francisco", "Charlotte", "Denver", "Atlanta", "Seattle", "Boston", "Chicago", "Miami", "New York"]

LOCATIONS = []
id_counter = 1
for state in states:
    for prefix in city_prefixes:
        for base in city_bases:
            if id_counter > 250:
                break
            slug = f"{prefix.lower()}-{base.lower().replace(' ', '-')}-{state.lower()}"
            name = f"{prefix} {base}, {state}"
            LOCATIONS.append({"id": id_counter, "slug": slug, "name": name})
            id_counter += 1

# =====================================================================
# RUNTIME PIPELINE EXECUTION ENGINE
# =====================================================================

def query_hermes(prompt):
    try:
        response = client.chat.completions.create(
            model="hermes-3",
            messages=[
                {"role": "system", "content": "You are a Senior Technical Architect at MTDT. Output explicit architectural content without fluff or pleasantries."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.2,
            max_tokens=600
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"❌ Pipeline generation error: {e}")
        return None

def write_page(filename, meta, body):
    with open(os.path.join(OUTPUT_DIR, filename), "w", encoding="utf-8") as f:
        f.write(f"---\n{meta}\n---\n{body}")

def execute_pipeline_batch(limit=100):
    """
    Executes a high-leverage target batch across your array permutations.
    Running 2.5 million calls linearly will stall your storage disk. 
    We slice the matrix to generate top strategic variations first.
    """
    print(f"🧬 Massive Matrix Initialized: {len(SERVICES)} Services | {len(INDUSTRIES)} Industries | {len(LOCATIONS)} Locations")
    print(f"⚡ Batch Processing Active. Running the first {limit} high-intent pages...")

    count = 0

    # Pattern A Loop: Core Industry Verticals (Service X for Industry Y)
    for s, i in itertools.product(SERVICES, INDUSTRIES):
        if count >= limit: 
            break
        
        filename = f"{s['slug']}-for-{i['slug']}.md"
        prompt = f"Write 3 structural paragraphs with ### headers detailing MTDT's engineering strategy for deploying {s['name']} inside {i['name']} infrastructures to eliminate {s['pain']}."
        
        body = query_hermes(prompt)
        if body:
            meta = f'title: "Enterprise {s["name"]} for {i["name"]} | MTDT"\ndescription: "MTDT scales production infrastructures by designing custom {s["name"]} systems tailored for {i["name"]} data specifications."\ntype: "industry"'
            write_page(filename, meta, body)
            count += 1
            print(f"[{count}/{limit}] ✓ Compiled: {filename}")

    # Pattern B Loop: Core Regional Hubs (Service Agency in City Z)
    for s, l in itertools.product(SERVICES, LOCATIONS):
        if count >= (limit * 2): # Generate an even balance across loops
            break
        
        filename = f"{s['slug']}-agency-in-{l['slug']}.md"
        prompt = f"Write 3 structural paragraphs with ### headers detailing how MTDT provides dedicated engineering consulting for {s['name']} for development teams based in {l['name']} to address {s['pain']}."
        
        body = query_hermes(prompt)
        if body:
            meta = f'title: "{s["name"]} Consulting Agency in {l["name"]} | MTDT"\ndescription: "Looking for a specialized engineering partner? MTDT offers premium {s["name"]} services for technology platforms throughout {l["name"]}."\ntype: "location"'
            write_page(filename, meta, body)
            count += 1
            print(f"[{count}/{limit * 2}] ✓ Compiled: {filename}")

    print(f"\n✨ Generation Sprint Complete. Output nodes saved to: {OUTPUT_DIR}")

if __name__ == "__main__":
    # Change the limit parameter to scale up production generation incrementally (e.g., 500, 5000, etc.)
    execute_pipeline_batch(limit=50)