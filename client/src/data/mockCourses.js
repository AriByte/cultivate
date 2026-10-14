// Structured Mock Courses aligned with SRS LEARN-REQ-01 through LEARN-REQ-07
export const MOCK_COURSES = [
  {
    id: 'course-soil-biology',
    title: 'Foundations of Living Soil Systems',
    slug: 'foundations-of-living-soil',
    category: 'Soil Science',
    tagline: 'Unlock the unseen microbial engine that powers organic crop vitality.',
    description: 'Master the fundamental biology that separates living organic soil from lifeless dirt. Explore aerobic composting ratios, mycorrhizal fungi colonization, root symbiosis, and regenerative cover-cropping cycles.',
    difficulty: 'Beginner',
    difficultyColor: '#059669',
    estimatedHours: '3.5 hrs',
    lessonsCount: 4,
    order: 1,
    featured: true,
    instructor: {
      name: 'Dr. Helena Vance',
      role: 'Senior Agroecologist & Soil Biologist'
    },
    learningObjectives: [
      'Analyze the Soil Food Web: bacteria, mycorrhizal fungi, protozoa, and nematodes',
      'Balance carbon-to-nitrogen (C:N) ratios in aerobic hot composting piles',
      'Diagnose soil deficiencies through visual bio-indicator plants and root nodulation',
      'Apply no-till mulching techniques to preserve moisture and soil crumb structure'
    ],
    lessons: [
      {
        id: 'l1',
        title: 'The Soil Food Web Architecture',
        duration: '12 min read',
        summary: 'Understand the primary trophic levels of soil microorganisms and how they cycle plant-accessible nutrients.',
        sections: [
          {
            type: 'paragraph',
            content: 'In industrial agriculture, soil is treated merely as a physical medium to anchor roots while synthetic chemical salts supply crude nitrogen, phosphorus, and potassium. In organic farming, soil is recognized as a living ecosystem—a teaspoon of healthy organic garden loam contains between 100 million and 1 billion active microorganisms.'
          },
          {
            type: 'callout',
            title: 'Core Biological Rule',
            variant: 'tip',
            content: 'Plants do not feed directly on dirt; they feed on the excretions and breakdown products of living bacteria, mycorrhizal fungi, and protozoa. In return, the plant shoots photosynthesize sugars and pump up to 30% of their carbohydrates into the soil as root exudates to feed these microscopic allies.'
          },
          {
            type: 'paragraph',
            content: 'The first trophic level consists of photosynthesizers (plants and algae) and decomposers (bacteria and fungi). When bacteria and fungi digest dead plant matter, they immobilize nutrients inside their cellular bodies. The second trophic level—protozoa (amoebae, flagellates, ciliates) and beneficial nematodes—prey upon bacteria, releasing the excess nitrogen in the plant-available ammonium (NH4+) form directly at the rhizosphere.'
          },
          {
            type: 'key_takeaways',
            items: [
              'Plants actively barter sugars with soil microbes in exchange for mined minerals.',
              'Protozoa grazing on bacteria is the primary natural engine of nitrogen release.',
              'Tillage and synthetic biocides tear apart fungal hyphae networks and collapse the food web.'
            ]
          }
        ]
      },
      {
        id: 'l2',
        title: 'Composting Science: C:N Balancing',
        duration: '18 min read',
        summary: 'Calculate optimal carbon-to-nitrogen ratios and monitor thermal phases for weed-seed sterilization.',
        sections: [
          {
            type: 'paragraph',
            content: 'Aerobic hot composting transforms organic biological waste into dark, crumbly humus teeming with beneficial biology. The speed and quality of composting depends heavily on the ratio of carbon-rich "brown" materials to nitrogen-rich "green" materials.'
          },
          {
            type: 'callout',
            title: 'The Golden Ratio: 25:1 to 30:1',
            variant: 'info',
            content: 'Microbes consume approximately 30 parts carbon for every 1 part nitrogen. If carbon is excessive (e.g., pure wood shavings at 400:1), decomposition stalls for months. If nitrogen is excessive (e.g., fresh poultry manure at 10:1), excess nitrogen volatilizes into foul ammonia gas, wasting valuable nutrients.'
          },
          {
            type: 'paragraph',
            content: 'A well-built hot compost pile achieves internal temperatures between 55°C and 65°C (131°F to 149°F) within 48 to 72 hours. This thermal spike pasteurizes weed seeds and pathogenic fungal spores while allowing thermo-tolerant Actinobacteria to thrive. Turning the pile replenishes oxygen and keeps the environment strictly aerobic.'
          },
          {
            type: 'key_takeaways',
            items: [
              'Browns (leaves, straw, cardboard) provide cellular energy and structure.',
              'Greens (grass clippings, kitchen scraps, fresh manure) provide cellular amino acids.',
              'Keep moisture at approximately 50-60%—like a wrung-out sponge.'
            ]
          }
        ]
      },
      {
        id: 'l3',
        title: 'Mycorrhizae & Root Symbiosis',
        duration: '15 min read',
        summary: 'Leverage endo- and ecto-mycorrhizal fungal hyphae to expand root nutrient absorption by 1000%.',
        sections: [
          {
            type: 'paragraph',
            content: 'Mycorrhizal fungi are ancient fungal partners that physically penetrate or envelop plant roots. Their microscopic filaments—known as hyphae—are up to 100 times thinner than the finest plant root hair, allowing them to penetrate microscopic soil crevices inaccessible to roots.'
          },
          {
            type: 'callout',
            title: 'Phosphorus Mining Masters',
            variant: 'tip',
            content: 'Phosphorus is notoriously immobile in natural soils. Mycorrhizal fungi exude specialized phosphatase enzymes and organic acids that dissolve tightly bound mineral phosphorus, shuttling it directly into the plant vascular system.'
          },
          {
            type: 'paragraph',
            content: 'Additionally, mycorrhizae produce a sticky glycoprotein called glomalin. Glomalin acts as nature’s biological glue, binding individual silt and sand particles into crumb aggregates. These aggregates give healthy soil its porous sponge-like structure, allowing rainwater to infiltrate rather than wash away as erosive runoff.'
          },
          {
            type: 'key_takeaways',
            items: [
              'Hyphae expand effective root absorption surface area by up to 1000%.',
              'Glomalin secretion creates resilient, drought-resistant soil aggregates.',
              'Avoid heavy synthetic phosphorus applications, which cause plants to reject fungal symbiosis.'
            ]
          }
        ]
      },
      {
        id: 'l4',
        title: 'Cover Cropping & Nitrogen Fixers',
        duration: '20 min read',
        summary: 'Harness legumes and rhizobia bacteria to pull nitrogen out of thin air and build lasting organic matter.',
        sections: [
          {
            type: 'paragraph',
            content: 'The Earth atmosphere is 78% elemental nitrogen (N2), yet plants cannot absorb atmospheric gas directly. Leguminous cover crops—including crimson clover, hairy vetch, winter peas, and field beans—form specialized nodules on their roots housing symbiotic Rhizobium bacteria.'
          },
          {
            type: 'callout',
            title: 'Biological Nitrogen Fixation',
            variant: 'tip',
            content: 'Healthy Rhizobium colonies contain an enzyme called nitrogenase that breaks the triple bond of N2 gas and converts it into plant-soluble ammonium. Cut down cover crops just as they reach 10-20% flowering to maximize soil nitrogen incorporation before the plants consume it to set seeds.'
          },
          {
            type: 'paragraph',
            content: 'Combining legumes with deep-rooted grasses (such as cereal rye) creates the ultimate winter cover. While the legume fixes atmospheric nitrogen, the cereal rye scavenges leftover subsoil nitrates and produces massive carbon biomass that prevents soil erosion during severe seasonal rainfalls.'
          },
          {
            type: 'key_takeaways',
            items: [
              'Legumes fix up to 100-200 kg of atmospheric nitrogen per hectare naturally.',
              'Always terminate or crimp cover crops at the flowering stage for peak nutrient density.',
              'Never leave soil bare between cash crops—living roots sustain the Soil Food Web year-round.'
            ]
          }
        ]
      }
    ],
    quiz: {
      id: 'quiz-soil-biology',
      title: 'Foundations of Living Soil Assessment',
      passingScore: 75,
      xpReward: 120,
      questions: [
        {
          id: 'q1',
          text: 'What is the primary natural mechanism through which plant-available nitrogen (NH4+) is released in the Soil Food Web?',
          options: [
            'Direct root absorption of atmospheric nitrogen gas',
            'Protozoa and nematodes grazing on nutrient-rich bacteria',
            'Mechanical compaction of dry clay particles',
            'Chemical oxidation from synthetic herbicide sprays'
          ],
          correctIndex: 1,
          explanation: 'Protozoa and bacterial-feeding nematodes consume bacteria. Because bacteria have a much narrower C:N ratio than protozoa require, the protozoa excrete the excess nitrogen as plant-soluble ammonium directly at the rhizosphere.'
        },
        {
          id: 'q2',
          text: 'What is the optimal Carbon-to-Nitrogen (C:N) ratio for an efficient, balanced aerobic hot composting pile?',
          options: [
            '5:1 to 10:1',
            '25:1 to 30:1',
            '80:1 to 100:1',
            '300:1 to 500:1'
          ],
          correctIndex: 1,
          explanation: 'A 25:1 to 30:1 C:N ratio supplies microbes with roughly 30 parts carbon for cellular respiration and energy for every 1 part nitrogen used to build proteins and enzymes.'
        },
        {
          id: 'q3',
          text: 'What sticky glycoprotein is secreted by mycorrhizal fungal hyphae to bind soil particles into water-stable aggregates?',
          options: [
            'Glomalin',
            'Chlorophyll',
            'Hemoglobin',
            'Cellulose'
          ],
          correctIndex: 0,
          explanation: 'Glomalin is a durable glycoprotein produced by arbuscular mycorrhizal fungi that glues soil mineral particles together into spongy, erosion-resistant aggregates.'
        },
        {
          id: 'q4',
          text: 'At what botanical growth stage should leguminous cover crops typically be terminated to maximize nitrogen return to the soil?',
          options: [
            'Immediately upon seedling emergence',
            'At 10% to 20% bloom / flowering stage',
            'After all seed pods have completely dried and hardened',
            'During mid-winter dormancy'
          ],
          correctIndex: 1,
          explanation: 'At 10-20% flowering, the plant has accumulated maximum vegetative nitrogen in its tissues. Allowing it to fully set seed causes the plant to redirect that nitrogen away from vegetative matter into its seeds.'
        },
        {
          id: 'q5',
          text: 'Why does excessive deep rototilling harm long-term soil health in an organic farm?',
          options: [
            'It adds too much atmospheric oxygen into the soil profile',
            'It fractures mycorrhizal fungal hyphae networks and oxidizes organic matter',
            'It turns earthworms into predatory leaf-eaters',
            'It permanently prevents seeds from germinating'
          ],
          correctIndex: 1,
          explanation: 'Aggressive mechanical inversion pulverizes soil crumb structure, slices through fungal mycelium networks, and exposes buried humus to rapid oxidation, depleting organic matter reserves.'
        }
      ]
    }
  },
  {
    id: 'course-ipm-defense',
    title: 'Integrated Organic Pest Management (IPM)',
    slug: 'integrated-organic-pest-management',
    category: 'Pest Defense',
    tagline: 'Defend your crops without synthetic sprays using nature’s predator-prey dynamics.',
    description: 'Learn the systemic strategy of monitoring economic injury thresholds, attracting predatory insects, and deploying targeted biological extracts like cold-pressed neem and Bacillus thuringiensis.',
    difficulty: 'Intermediate',
    difficultyColor: '#D97706',
    estimatedHours: '4 hrs',
    lessonsCount: 4,
    order: 2,
    featured: true,
    instructor: {
      name: 'Marcus Thorne',
      role: 'Integrated Pest Management Specialist'
    },
    learningObjectives: [
      'Define Economic Injury Levels (EIL) and Economic Thresholds (ET) for pest management',
      'Design beneficial insect habitat corridors using flowering umbel companion plants',
      'Prepare and apply targeted botanical and microbial sprays without harming pollinators',
      'Deploy companion trap crops to deflect pests away from core harvest plots'
    ],
    lessons: [
      {
        id: 'l5',
        title: 'Pest Thresholds & Scouting Protocols',
        duration: '14 min read',
        summary: 'Master the difference between casual pest presence and economic damage thresholds.',
        sections: [
          {
            type: 'paragraph',
            content: 'The greatest misconception in beginner gardening is that a healthy farm must be 100% pest-free. In reality, a low baseline population of pests is essential because it provides food for the beneficial predators that protect your farm from catastrophic infestations.'
          },
          {
            type: 'callout',
            title: 'Economic Threshold vs. Economic Injury Level',
            variant: 'info',
            content: 'The Economic Injury Level (EIL) is the lowest pest population density that will cause economic damage equal to the cost of intervention. The Economic Threshold (ET) is the trigger point at which action must be taken to prevent the population from reaching the EIL.'
          },
          {
            type: 'paragraph',
            content: 'Routine scouting protocols—inspecting the undersides of leaves, monitoring sticky cards, and calculating percentage foliage loss—prevent panic-induced knee-jerk spraying. If only 5 aphids are spotted on 20 sampled tomato plants, natural ladybug larvae will often resolve the issue within 48 hours.'
          },
          {
            type: 'key_takeaways',
            items: [
              'Zero pests = Zero beneficial predators. Aim for ecological balance, not sterile eradication.',
              'Always inspect leaf undersides and apical growth tips during weekly scouting.',
              'Only intervene when the pest population crosses the predetermined Economic Threshold.'
            ]
          }
        ]
      },
      {
        id: 'l6',
        title: 'Beneficial Insects & Habitat Strips',
        duration: '16 min read',
        summary: 'Shelter ladybugs, hoverflies, lacewings, and parasitoid wasps with flowering insectary corridors.',
        sections: [
          {
            type: 'paragraph',
            content: 'Every insect pest has a dedicated natural enemy evolved to consume it. Green lacewing larvae (often called "aphid lions") can devour up to 60 aphids per day, while tiny parasitic wasps (Trichogramma and Braconids) lay their eggs inside caterpillar pests, preventing crop devastation.'
          },
          {
            type: 'callout',
            title: 'Umbel Flowers for Tiny Parasitoids',
            variant: 'tip',
            content: 'Parasitic wasps have tiny mouthparts and cannot feed on deep tubular blossoms. Interplanting flowers from the Apiaceae family (dill, fennel, coriander, sweet alyssum) provides the micro-nectar sources adult wasps need to survive and reproduce.'
          },
          {
            type: 'paragraph',
            content: 'Establishing permanent perennial beetle banks and flowering field borders creates year-round shelter for predatory ground beetles (Carabidae) and spiders that patrol crop beds at night, consuming slug eggs and soil-dwelling cutworms.'
          },
          {
            type: 'key_takeaways',
            items: [
              'Lacewing larvae and syrphid fly maggots are voracious aphid predators.',
              'Sweet alyssum and dill provide micro-nectar essential for parasitoid wasps.',
              'Perennial borders keep predator populations stable between cash crop plantings.'
            ]
          }
        ]
      },
      {
        id: 'l7',
        title: 'Botanical & Microbial Bio-Controls',
        duration: '22 min read',
        summary: 'Safely formulate cold-pressed neem seed oil, potassium bicarbonate, and Bacillus thuringiensis (BT).',
        sections: [
          {
            type: 'paragraph',
            content: 'When biological controls and cultural practices fail to keep pest populations below the Economic Threshold, certified organic growers turn to targeted biological extracts that degrade rapidly in sunlight without leaving harmful toxic residues in soil or food.'
          },
          {
            type: 'callout',
            title: 'Cold-Pressed Neem Oil (Azadirachtin)',
            variant: 'warning',
            content: 'Azadirachtin does not kill on contact. It acts as an insect growth regulator (IGR) and feeding deterrent. It interrupts molting in nymph insects. Never spray during daytime hours when honeybees and pollinators are foraging; always apply at dusk to ensure the spray dries before dawn.'
          },
          {
            type: 'paragraph',
            content: 'Bacillus thuringiensis (BT) is a naturally occurring soil bacterium. When caterpillars (such as tomato hornworms or cabbage loopers) ingest foliage sprayed with BT kurstaki, the crystalline endotoxins activate in their alkaline gut, stopping all feeding within hours while remaining completely harmless to mammals, birds, and adult bees.'
          },
          {
            type: 'key_takeaways',
            items: [
              'Azadirachtin interrupts the hormonal molting cycle of soft-bodied nymphs.',
              'Apply sprays strictly at dusk or overcast days to protect foraging pollinators.',
              'BT is highly specific to chewing lepidopteran caterpillars and harmless to non-target wildlife.'
            ]
          }
        ]
      },
      {
        id: 'l8',
        title: 'Trap Cropping & Companion Guilds',
        duration: '18 min read',
        summary: 'Sacrificial plants and aromatic herbs that confuse, repel, or lure pests away from cash crops.',
        sections: [
          {
            type: 'paragraph',
            content: 'In monoculture, thousands of identical crop plants release uniform volatile scent plumes that act as beacons for specialist pests. By interplanting diverse aromatic companions and strategic perimeter trap crops, you disguise your cash crops.'
          },
          {
            type: 'callout',
            title: 'The Blue Hubbard Trap Crop Strategy',
            variant: 'tip',
            content: 'Squash bugs and vine borers exhibit an irresistible preference for Blue Hubbard winter squash over yellow crookneck or zucchini. Planting a perimeter border of Blue Hubbard lures up to 90% of the borers to the outer boundary, saving the main crop.'
          },
          {
            type: 'paragraph',
            content: 'Aromatic herbs like French marigolds (Tagetes patula) release alpha-terthienyl compounds from their root zones, suppressing parasitic root-knot nematodes, while their pungent foliage masks the scent of nearby tomatoes from searching whiteflies.'
          },
          {
            type: 'key_takeaways',
            items: [
              'Trap crops must be significantly more attractive to the target pest than the cash crop.',
              'Aromatic companion plants confuse pest olfactory search mechanisms.',
              'Destroy or vacuum pests off trap crops before their larvae mature.'
            ]
          }
        ]
      }
    ],
    quiz: {
      id: 'quiz-ipm-defense',
      title: 'Integrated Pest Management Assessment',
      passingScore: 75,
      xpReward: 140,
      questions: [
        {
          id: 'q1',
          text: 'What is the definition of the Economic Threshold (ET) in Integrated Pest Management?',
          options: [
            'The point when the entire crop has been completely destroyed',
            'The pest density trigger point where control action must be taken to prevent economic damage',
            'The price per kilogram of pesticide at the farm supply store',
            'The legal limit of synthetic residue permitted in grocery stores'
          ],
          correctIndex: 1,
          explanation: 'The Economic Threshold (ET) is the specific pest population density at which management tactics must be deployed to prevent the population from reaching the higher Economic Injury Level (EIL).'
        },
        {
          id: 'q2',
          text: 'Which family of companion flowers is most effective for providing shallow micro-nectar to adult parasitoid wasps?',
          options: [
            'Deep bell-shaped Solanaceae flowers',
            'Shallow umbel flowers like dill, fennel, and sweet alyssum',
            'Large woody pine cones',
            'Submerged aquatic lily pads'
          ],
          correctIndex: 1,
          explanation: 'Parasitoid wasps have diminutive mouthparts that cannot access deep nectar tubes. Open, shallow umbel clusters (dill, sweet alyssum, coriander) allow them easy access to carbohydrates.'
        },
        {
          id: 'q3',
          text: 'How does the organic botanical compound Azadirachtin (neem extract) control pest populations?',
          options: [
            'It functions as a neurotoxin that causes instant paralysis within 2 seconds',
            'It acts as an Insect Growth Regulator (IGR) that disrupts hormonal molting and feeding',
            'It mechanically glues the wings of adult beetles together',
            'It alters the soil pH so roots stop absorbing nitrogen'
          ],
          correctIndex: 1,
          explanation: 'Azadirachtin interferes with ecdysone, the insect molting hormone, preventing nymphs and juvenile instars from successfully shedding their exoskeletons to grow into adults.'
        },
        {
          id: 'q4',
          text: 'Why should organic bio-pesticide sprays always be applied at dusk or late evening?',
          options: [
            'To prevent sunlight breakdown of active ingredients and protect daytime pollinators like bees',
            'Because water weighs less at night due to gravitational shifts',
            'Because plants only absorb liquids through their leaves in complete darkness',
            'To avoid waking up nocturnal soil earthworms'
          ],
          correctIndex: 0,
          explanation: 'Spraying at dusk ensures the solution dries overnight before diurnal pollinators (bees, butterflies) begin foraging at dawn, and prevents rapid UV photolysis of sensitive botanical compounds.'
        },
        {
          id: 'q5',
          text: 'In companion planting, what is a "trap crop"?',
          options: [
            'A plant that physically snaps shut like a Venus Flytrap',
            'A sacrificial plant planted to lure pests away from the primary valuable cash crop',
            'A synthetic net placed over fruit trees to catch birds',
            'A deep root vegetable grown solely to extract heavy metals from groundwater'
          ],
          correctIndex: 1,
          explanation: 'A trap crop is a sacrificial plant variety favored by specific pests (such as Blue Hubbard squash for squash bugs) planted along field perimeters to concentrate and distract pests away from the core crop.'
        }
      ]
    }
  },
  {
    id: 'course-water-conservation',
    title: 'Water Stewardship & Precision Irrigation',
    slug: 'water-stewardship-precision-irrigation',
    category: 'Water Management',
    tagline: 'Achieve maximum crop yield with minimal water footprints in changing climates.',
    description: 'Explore the hydrology of living organic soil, calculate crop evapotranspiration, size gravity drip systems, and build swales and keyline contours to hold rainwater in your field.',
    difficulty: 'Advanced',
    difficultyColor: '#2563EB',
    estimatedHours: '3.5 hrs',
    lessonsCount: 4,
    order: 3,
    featured: true,
    instructor: {
      name: 'Elena Rostova',
      role: 'Hydrological Engineer & Permaculture Designer'
    },
    learningObjectives: [
      'Compare flood vs. drip irrigation efficiency and evaporation loss curves',
      'Calculate soil water retention increases per 1% of organic matter added',
      'Implement swales, keyline water collection contours, and rainwater cisterns',
      'Mitigate crop heat stress during drought periods using living mulches and shade canopies'
    ],
    lessons: [
      {
        id: 'l9',
        title: 'Evapotranspiration & Crop Water Curves',
        duration: '15 min read',
        summary: 'Calculate crop transpiration versus surface evaporation to prevent chronic water waste.',
        sections: [
          {
            type: 'paragraph',
            content: 'Evapotranspiration (ET) is the sum of water lost to the atmosphere through evaporation from the soil surface plus transpiration through plant stomata. Water demand is not static—it fluctuates sharply across different crop growth stages.'
          },
          {
            type: 'callout',
            title: 'Critical Water Need Windows',
            variant: 'info',
            content: 'A tomato plant consumes negligible water as a 10cm seedling (10-15 ml/day). However, during flowering and fruit sizing, that same plant demands 1.5 to 2.5 liters daily. Moisture deficits during flowering trigger blossom drop and calcium-deficiency blossom end rot.'
          },
          {
            type: 'paragraph',
            content: 'Traditional overhead sprinklers lose 30% to 50% of water directly to mid-day wind drift and evaporation before moisture ever reaches the root zone. Wetting the foliage also creates ideal conditions for fungal blight spores to germinate.'
          },
          {
            type: 'key_takeaways',
            items: [
              'Crop water demand peaks dramatically during flowering and fruit enlargement.',
              'Overhead watering wastes up to 40% of water and encourages fungal leaf blight.',
              'Water deeply and infrequently to encourage deep taproots rather than shallow surface roots.'
            ]
          }
        ]
      },
      {
        id: 'l10',
        title: 'Soil Organic Matter: Nature’s Sponge',
        duration: '16 min read',
        summary: 'How each 1% increase in soil organic matter holds 170,000 liters of water per hectare.',
        sections: [
          {
            type: 'paragraph',
            content: 'The most effective water reservoir on an organic farm is not a plastic holding tank or concrete dam—it is the soil itself. Humus particles have an enormous internal surface area capable of adsorbing and retaining water against the pull of gravity.'
          },
          {
            type: 'callout',
            title: 'The NRCS Water Retention Benchmark',
            variant: 'tip',
            content: 'Every 1% increase in Soil Organic Matter (SOM) in the top 30cm of soil allows the ground to hold an additional 170,000 to 250,000 liters of plant-available water per hectare (roughly 20,000 gallons per acre).'
          },
          {
            type: 'paragraph',
            content: 'By building organic matter through compost and multi-species cover crops, an organic farm can buffer crops through 3 to 4 weeks of drought with zero supplemental irrigation, while nearby chemically degraded soils bake into impenetrable rock.'
          },
          {
            type: 'key_takeaways',
            items: [
              'Soil organic matter is the highest-capacity, zero-energy water reservoir.',
              'Humus acts like a sponge, releasing water gradually as plant roots pull on it.',
              'Bare soil loses moisture 4x faster through direct solar evaporation than mulched soil.'
            ]
          }
        ]
      },
      {
        id: 'l11',
        title: 'Precision Drip & Gravity Systems',
        duration: '18 min read',
        summary: 'Design low-pressure drip tape networks with pressure regulators and biological filtration.',
        sections: [
          {
            type: 'paragraph',
            content: 'Drip irrigation delivers water directly to the soil surface immediately adjacent to the plant root zone at low pressures (8 to 15 PSI). Efficiency rates exceed 90%, representing a massive conservation leap over flood or sprinkler regimes.'
          },
          {
            type: 'callout',
            title: 'Emitter Spacing and Flow Rates',
            variant: 'info',
            content: 'In sandy soils, water moves downward in a narrow vertical column. Emitter spacing should be 20cm apart. In heavy clay soils, capillary action draws water sideways into wide horizontal onions. Emitter spacing can comfortably expand to 30cm-40cm.'
          },
          {
            type: 'paragraph',
            content: 'Elevating a 1000-liter IBC water tote just 2 meters above ground generates approximately 2.8 PSI of natural gravity head pressure—sufficient to run specialized low-pressure drip tape without needing an electrical generator or grid pump.'
          },
          {
            type: 'key_takeaways',
            items: [
              'Drip systems cut water usage by 40-60% compared to overhead sprinklers.',
              'Always include a 120-mesh disk filter to prevent particulate clogs in emitters.',
              'Gravity-fed systems provide energy-independent irrigation for smallholdings.'
            ]
          }
        ]
      },
      {
        id: 'l12',
        title: 'Earthworks: Swales & Keyline Contours',
        duration: '20 min read',
        summary: 'Shape landscape contours to slow, spread, and sink ephemeral rainwater across farm acreage.',
        sections: [
          {
            type: 'paragraph',
            content: 'When torrential rain strikes sloping farmland, water accelerates downhill, stripping away topsoil and cutting deep erosive gullies. Permaculture earthworks reverse this process by turning runoff into subsoil recharge.'
          },
          {
            type: 'callout',
            title: 'Slow, Spread, and Sink',
            variant: 'tip',
            content: 'A swale is a ditch dug exactly on a topographical contour line, with the excavated soil mounded on the downhill side. Rainwater fills the ditch level and is forced to slowly infiltrate deep into the subsoil, creating a permanent underground moisture lens.'
          },
          {
            type: 'paragraph',
            content: 'Keyline design uses gentle off-contour tines to guide excess ridge water toward dry ridges and plateaus. Over 3-5 years, subsoil moisture storage increases so dramatically that downslope springs often begin flowing year-round.'
          },
          {
            type: 'key_takeaways',
            items: [
              'Contour swales capture surface runoff and recharge deep subsoil moisture lenses.',
              'Plant deep-rooted perennial shrubs and fruit trees on swale berms to anchor soil.',
              'Slow runoff, spread it across the contour, and sink it into the water table.'
            ]
          }
        ]
      }
    ],
    quiz: {
      id: 'quiz-water-conservation',
      title: 'Water Stewardship & Irrigation Assessment',
      passingScore: 75,
      xpReward: 150,
      questions: [
        {
          id: 'q1',
          text: 'According to USDA and NRCS benchmarks, roughly how much additional water can 1 hectare of soil hold for every 1% increase in organic matter?',
          options: [
            '1,000 to 2,000 liters',
            '15,000 to 25,000 liters',
            '170,000 to 250,000 liters',
            'Over 10,000,000 liters'
          ],
          correctIndex: 2,
          explanation: 'Each 1% increase in Soil Organic Matter (SOM) in the top 30cm layer allows the ground to hold approximately 170,000 to 250,000 liters of plant-available moisture per hectare.'
        },
        {
          id: 'q2',
          text: 'Why does overhead sprinkler irrigation carry an increased risk of fungal disease compared to drip irrigation?',
          options: [
            'It makes the soil too alkaline for friendly bacteria',
            'It keeps crop leaves and stems wet for extended periods, creating ideal conditions for fungal spore germination',
            'It washes all nitrogen down into the center of the earth',
            'It causes plant leaves to stop performing photosynthesis'
          ],
          correctIndex: 1,
          explanation: 'Fungal spores (such as early blight and powdery mildew) require free moisture on the leaf surface for 4 to 8 hours to germinate and penetrate plant tissue. Drip irrigation keeps the canopy completely dry.'
        },
        {
          id: 'q3',
          text: 'During which botanical growth phase does a tomato or corn plant exhibit its highest peak daily water consumption?',
          options: [
            'During initial seed germination inside the ground',
            'During flowering, pollination, and fruit/grain sizing',
            'Immediately before the plant completely dies in winter',
            'During the first 2 days after transplanting'
          ],
          correctIndex: 1,
          explanation: 'Flowering and fruit/grain filling requires tremendous cellular expansion and hydraulic pressure, causing plant evapotranspiration to surge to peak seasonal levels.'
        },
        {
          id: 'q4',
          text: 'What is the primary function of an on-contour swale in ecological land design?',
          options: [
            'To drain all surface water off the farm as fast as possible into roadside ditches',
            'To slow downhill rainwater runoff, spread it along the contour, and sink it into the subsoil',
            'To build an impenetrable barrier against wind',
            'To increase the slope of the hill for faster tractor driving'
          ],
          correctIndex: 1,
          explanation: 'A swale is a level ditch dug on contour designed to intercept rushing runoff, spread the volume evenly, and allow it to slowly percolate into the underground water table.'
        },
        {
          id: 'q5',
          text: 'What is the typical operational efficiency range of a properly installed drip irrigation system compared to flood irrigation?',
          options: [
            'Drip is around 30% efficient, flood is 95% efficient',
            'Drip is roughly equal to flood at 50% efficiency',
            'Drip operates at 90-95% efficiency, while flood often loses 50-60% to deep percolation and runoff',
            'Drip irrigation cannot be used in organic farming'
          ],
          correctIndex: 2,
          explanation: 'Drip systems deliver water with 90-95% application efficiency directly to the rhizosphere, whereas flood irrigation suffers immense losses from evaporation, deep drainage below root depth, and runoff.'
        }
      ]
    }
  },
  {
    id: 'course-crop-rotation',
    title: 'Crop Rotation & Polyculture Systems',
    slug: 'crop-rotation-polyculture-systems',
    category: 'Crop Planning',
    tagline: 'Design 4-year rotational guilds to break pest cycles and balance heavy feeders with nitrogen restorers.',
    description: 'Learn how to group crops by botanical plant families, schedule sequential 4-year rotations, and intercrop complementary polycultures to optimize land use and soil health.',
    difficulty: 'Intermediate',
    difficultyColor: '#D97706',
    estimatedHours: '3 hrs',
    lessonsCount: 3,
    order: 4,
    featured: false,
    instructor: {
      name: 'Dr. Helena Vance',
      role: 'Senior Agroecologist & Soil Biologist'
    },
    learningObjectives: [
      'Classify commercial crops into botanical plant families (Solanaceae, Brassicaceae, Fabaceae, Cucurbitaceae)',
      'Construct a 4-year rotational sequence alternating heavy feeders, light feeders, and soil builders',
      'Deploy companion intercropping strategies like the ancient Mesoamerican Three Sisters guild',
      'Break soil-borne pathogens like Verticillium and Clubroot without fumigant chemicals'
    ],
    lessons: [
      {
        id: 'l13',
        title: 'Botanical Plant Families & Pest Memory',
        duration: '14 min read',
        summary: 'Why planting tomatoes after potatoes invites catastrophic pathogen buildup in the soil.',
        sections: [
          {
            type: 'paragraph',
            content: 'Botanically related crops share nearly identical genetic traits, nutritional appetites, and pest vulnerabilities. Growing crops from the same family in the same plot year after year creates "soil memory"—a compound accumulation of specialist pests and fungal spores.'
          },
          {
            type: 'callout',
            title: 'The Solanaceae Trap',
            variant: 'warning',
            content: 'Tomatoes, potatoes, eggplants, and bell peppers all belong to the Solanaceae (nightshade) family. Rotating from tomatoes to potatoes provides zero biological rest; soil-borne fungi like early blight (Alternaria solani) will thrive and intensify.'
          },
          {
            type: 'paragraph',
            content: 'A standard organic rotation demands at least a 3- to 4-year gap before any plant from the same botanical family returns to that specific plot of land.'
          },
          {
            type: 'key_takeaways',
            items: [
              'Never rotate between crops in the same botanical family in consecutive years.',
              'Major families: Solanaceae (nightshades), Brassicaceae (cabbages), Fabaceae (legumes), Poaceae (grasses/grains).',
              'A 4-year rotation starves out up to 95% of host-specific fungal spores.'
            ]
          }
        ]
      },
      {
        id: 'l14',
        title: 'The Feeder Cycle: Heavy, Light, Builder',
        duration: '16 min read',
        summary: 'Organize beds into a continuous nutrient cycle: Heavy Feeder -> Light Feeder -> Restorer -> Heavy Giver.',
        sections: [
          {
            type: 'paragraph',
            content: 'Crops differ dramatically in the quantity of soil minerals they extract. A rational rotation pairs heavy mineral extractors with restorative fertility builders.'
          },
          {
            type: 'callout',
            title: 'The 3 Feeder Classes',
            variant: 'info',
            content: '1. Heavy Feeders (Corn, Tomato, Cabbage): Consume immense nitrogen and potassium.\n2. Light Feeders (Carrots, Onions, Radishes): Scavenge deep residual minerals without exhausting soil.\n3. Soil Builders (Peas, Beans, Clover): Legumes that infuse organic nitrogen back into the profile.'
          },
          {
            type: 'paragraph',
            content: 'The universal sequence is: Year 1 Heavy Feeder (e.g. Corn) -> Year 2 Light Feeder (e.g. Carrot) -> Year 3 Soil Builder (e.g. Legume / Clover) -> Year 4 Leafy Feeder (e.g. Brassica).'
          },
          {
            type: 'key_takeaways',
            items: [
              'Follow heavy feeders with deep-rooting light feeders to capture subsoil nutrients.',
              'Always insert a restorative legume or cover crop before returning to heavy feeders.',
              'Add compost primarily before heavy feeders and avoid over-fertilizing light root crops.'
            ]
          }
        ]
      },
      {
        id: 'l15',
        title: 'Polyculture Guilds & The Three Sisters',
        duration: '18 min read',
        summary: 'Intercrop spatial guilds of corn, beans, and squash to maximize multi-story yield per square meter.',
        sections: [
          {
            type: 'paragraph',
            content: 'Nature rarely grows in sterile monocultures. Polyculture—growing multiple complementary crops in close spatial proximity—maximizes sunlight capture, root tiering, and biological protection.'
          },
          {
            type: 'callout',
            title: 'The Three Sisters Agro-Guild',
            variant: 'tip',
            content: 'Indigenous American agriculture perfected the Three Sisters polyculture:\n• Corn provides a living vertical trellis for climbing pole beans.\n• Beans fix atmospheric nitrogen into the root zone to feed the corn.\n• Winter Squash spreads broad spiny leaves across the ground, creating a living mulch that shades out weeds and repels raccoons.'
          },
          {
            type: 'paragraph',
            content: 'Modern polycultures calculate Land Equivalent Ratios (LER). When corn, beans, and squash are intercropped properly, the LER often reaches 1.3 to 1.5, meaning it would take 1.5 hectares of monoculture to produce the same food as 1 hectare of polyculture.'
          },
          {
            type: 'key_takeaways',
            items: [
              'Polycultures occupy different vertical layers: canopy, climber, and ground cover.',
              'Root depth stratification prevents root competition between neighboring plants.',
              'High biological diversity suppresses weeds and dramatically lowers pest spread.'
            ]
          }
        ]
      }
    ],
    quiz: {
      id: 'quiz-crop-rotation',
      title: 'Crop Rotation & Polyculture Assessment',
      passingScore: 75,
      xpReward: 130,
      questions: [
        {
          id: 'q1',
          text: 'Why is rotating a plot from tomatoes to potatoes ineffective at preventing soil-borne disease?',
          options: [
            'Potatoes require 100 times more sunlight than tomatoes',
            'Both tomatoes and potatoes belong to the same botanical family (Solanaceae) and share the same pathogens',
            'Potatoes exude acidic sap that dissolves tomato seeds',
            'Potatoes attract giant locusts that consume tomato leaves'
          ],
          correctIndex: 1,
          explanation: 'Both tomatoes and potatoes are in the Solanaceae family. Pathogens like early blight, late blight, and root-knot nematodes easily survive and multiply if one Solanaceous crop immediately follows another.'
        },
        {
          id: 'q2',
          text: 'In a classic 3-step crop rotation cycle, what type of crop should ideally be planted after heavy-feeding crops (like corn or tomatoes)?',
          options: [
            'Another even heavier-feeding crop with double fertilizer',
            'Light-feeding root crops (like carrots) or soil-building nitrogen fixers (like legumes)',
            'Plastic turf grass',
            'Bare fallow dirt exposed to direct scorching summer sun'
          ],
          correctIndex: 1,
          explanation: 'Following heavy feeders with light feeders (carrots, onions) or restorative legumes allows the soil to recover and scavenges residual subsoil nutrients without depleting topsoil reserves.'
        },
        {
          id: 'q3',
          text: 'In the traditional "Three Sisters" polyculture guild, what ecological role is fulfilled by the climbing pole beans?',
          options: [
            'They produce giant spikes that impale garden birds',
            'They fix atmospheric nitrogen into the soil to feed the corn while climbing the cornstalk as a trellis',
            'They shade out the corn and keep it cool in winter',
            'They attract aphids away from the squash'
          ],
          correctIndex: 1,
          explanation: 'Climbing pole beans use the sturdy corn stalk as a vertical support structure and, through symbiotic Rhizobium nodules, fix atmospheric nitrogen to nourish the entire guild.'
        },
        {
          id: 'q4',
          text: 'What is a Land Equivalent Ratio (LER) and what does an LER of 1.4 indicate in polyculture farming?',
          options: [
            'It indicates that polyculture produced 40% less food than monoculture',
            'It indicates that 1 hectare of polyculture produced the yield equivalent of 1.4 hectares of separate monocultures',
            'It indicates the farm owes 40% more tax to the local government',
            'It indicates the soil has lost 40% of its moisture'
          ],
          correctIndex: 1,
          explanation: 'An LER of 1.4 means that an intercropped polyculture was 40% more productive per unit area than growing the crops in separate monocultures, demonstrating efficient multi-canopy space utilization.'
        },
        {
          id: 'q5',
          text: 'What is the recommended minimum interval of years before returning a botanical plant family to the exact same garden plot in an organic rotation?',
          options: [
            '1 month',
            '6 months',
            'At least 3 to 4 years',
            '50 years'
          ],
          correctIndex: 2,
          explanation: 'A 3- to 4-year rotational break is the agronomic standard needed to disrupt life cycles of soil-borne pests, break weed seed banks, and deplete specialist fungal resting spores.'
        }
      ]
    }
  }
];
