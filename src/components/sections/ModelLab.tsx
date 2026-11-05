"use client"

import Image from "next/image"
import { useEffect, useRef, useState, type ChangeEvent } from "react"
import { Upload, WandSparkles } from "lucide-react"

type LabMode = "plant" | "detection"
type RequestState = "idle" | "loading" | "unavailable"

type SamplePreset = {
  id: string
  label: string
  detail: string
  src: string
}

const samplePresets: Record<LabMode, SamplePreset[]> = {
  plant: [
    {
      id: "leaf-healthy",
      label: "Leaf sample A",
      detail: "Plant image preset",
      src: "/lab/plant-leaf.svg",
    },
    {
      id: "leaf-closeup",
      label: "Leaf sample B",
      detail: "Plant image preset",
      src: "/lab/plant-spots.svg",
    },
  ],
  detection: [
    {
      id: "street-scene",
      label: "Street scene",
      detail: "Object detection preset",
      src: "/lab/detection-street.svg",
    },
    {
      id: "vehicle-scene",
      label: "Vehicle scene",
      detail: "Object detection preset",
      src: "/lab/detection-vehicle.svg",
    },
  ],
}

const modelNames: Record<LabMode, string[]> = {
  plant: ["ViT-Base", "Swin-Base"],
  detection: ["YOLOv8s"],
}

export function ModelLab({
  activeTab,
  onTabChange,
}: {
  activeTab: number
  onTabChange: (tab: number) => void
}) {
  const mode: LabMode = activeTab === 0 ? "plant" : "detection"
  const [selectedSample, setSelectedSample] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)
  const filePreviewUrl = useRef<string | null>(null)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [requestState, setRequestState] = useState<RequestState>("idle")
  const [requestMessage, setRequestMessage] = useState<string | null>(null)

  const activeSamples = samplePresets[mode]
  const activeSample =
    activeSamples.find((sample) => sample.id === selectedSample) ?? null
  const previewSrc = filePreview ?? activeSample?.src ?? null

  useEffect(
    () => () => {
      if (filePreviewUrl.current) {
        URL.revokeObjectURL(filePreviewUrl.current)
      }
    },
    [],
  )

  function clearFilePreview() {
    if (filePreviewUrl.current) {
      URL.revokeObjectURL(filePreviewUrl.current)
      filePreviewUrl.current = null
    }
    setFilePreview(null)
  }

  function chooseMode(nextMode: LabMode) {
    onTabChange(nextMode === "plant" ? 0 : 1)
    setSelectedSample(null)
    setSelectedFile(null)
    clearFilePreview()
    setValidationError(null)
    setRequestState("idle")
    setRequestMessage(null)
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setValidationError(null)
    setRequestState("idle")
    setRequestMessage(null)
    setSelectedSample(null)

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setSelectedFile(null)
      clearFilePreview()
      setValidationError("Choose a JPG or PNG image.")
      event.target.value = ""
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setSelectedFile(null)
      clearFilePreview()
      setValidationError("Image must be 5 MB or smaller.")
      event.target.value = ""
      return
    }

    clearFilePreview()
    const previewUrl = URL.createObjectURL(file)
    filePreviewUrl.current = previewUrl
    setFilePreview(previewUrl)
    setSelectedFile(file)
  }

  async function runInference() {
    if (!selectedFile && !activeSample) {
      setValidationError("Choose a sample preset or upload an image first.")
      return
    }

    setValidationError(null)
    setRequestMessage(null)
    setRequestState("loading")

    const formData = new FormData()
    formData.set("mode", mode)
    if (selectedFile) {
      formData.set("image", selectedFile)
    } else if (activeSample) {
      formData.set("sampleId", activeSample.id)
    }

    try {
      const response = await fetch("/api/lab/inference", {
        method: "POST",
        body: formData,
      })
      const result = (await response.json()) as { message?: string }
      if (!response.ok) {
        setRequestMessage(
          result.message ?? "The inference request could not be completed.",
        )
        setRequestState("unavailable")
        return
      }

      setRequestMessage("Inference completed.")
      setRequestState("unavailable")
    } catch {
      setRequestMessage(
        "Could not reach the inference service. Please try again later.",
      )
      setRequestState("unavailable")
    }
  }

  return (
    <div className="mt-10 overflow-hidden rounded-2xl border border-grid bg-obsidian backdrop-blur-md dark:border-white/[0.08] dark:bg-white/[0.03] sm:mt-14">
      <div
        role="tablist"
        aria-label="Computer vision experiments"
        className="flex flex-wrap gap-2 border-b border-black/[0.08] p-3 dark:border-white/[0.08] sm:p-4"
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === "plant"}
          onClick={() => chooseMode("plant")}
          className={`rounded-full px-4 py-2 font-mono text-xs transition-colors ${
            mode === "plant"
              ? "bg-accent text-primary dark:text-white"
              : "border border-grid text-primary hover:border-accent hover:text-accent dark:border-white/10 dark:text-zinc-400 dark:hover:text-white"
          }`}
        >
          Plant classification
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "detection"}
          onClick={() => chooseMode("detection")}
          className={`rounded-full px-4 py-2 font-mono text-xs transition-colors ${
            mode === "detection"
              ? "bg-accent text-primary dark:text-white"
              : "border border-grid text-primary hover:border-accent hover:text-accent dark:border-white/10 dark:text-zinc-400 dark:hover:text-white"
          }`}
        >
          YOLOv8s detection
        </button>
      </div>

      <div
        role="tabpanel"
        className="grid gap-8 p-4 sm:p-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:p-8"
      >
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
            {mode === "plant" ? "Classification benchmark" : "Detection benchmark"}
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl">
            {mode === "plant"
              ? "ViT-Base × Swin-Base"
              : "YOLOv8s / PASCAL VOC 2012"}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            {mode === "plant"
              ? "Compare the two model pipelines side by side. Verified scores will appear here when the evaluation artifacts are connected."
              : "Inspect the object-detection input workflow. Precision, recall, and mAP results are not reported until the benchmark service is available."}
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {activeSamples.map((sample) => (
              <button
                type="button"
                key={sample.id}
                aria-pressed={selectedSample === sample.id}
                onClick={() => {
                  setSelectedFile(null)
                  clearFilePreview()
                  setSelectedSample(sample.id)
                  setValidationError(null)
                  setRequestState("idle")
                  setRequestMessage(null)
                }}
                className={`group overflow-hidden rounded-xl border text-left transition-colors ${
                  selectedSample === sample.id
                    ? "border-accent bg-lifted"
                    : "border-grid bg-lifted hover:border-accent dark:border-white/[0.08] dark:bg-white/[0.02] dark:hover:border-white/20"
                }`}
              >
                <span className="relative block aspect-[16/8] overflow-hidden">
                  <Image
                    src={sample.src}
                    alt={sample.label}
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(min-width: 640px) 25vw, 100vw"
                  />
                </span>
                <span className="block p-3">
                  <span className="block text-sm text-primary">
                    {sample.label}
                  </span>
                  <span className="mt-1 block font-mono text-[10px] text-muted">
                    {sample.detail}
                  </span>
                </span>
              </button>
            ))}
          </div>

          <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-grid px-4 py-4 text-sm text-primary transition-colors hover:border-accent hover:text-accent dark:border-white/15 dark:text-zinc-300 dark:hover:text-white">
            <Upload size={16} />
            <span>{selectedFile ? selectedFile.name : "Upload a JPG or PNG"}</span>
            <span className="font-mono text-[10px] text-muted">
              Max 5 MB
            </span>
            <input
              type="file"
              accept="image/jpeg,image/png"
              className="sr-only"
              onChange={handleFileChange}
            />
          </label>
          {validationError && (
            <p role="alert" className="mt-2 text-sm text-rose-300">
              {validationError}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Evaluation panel
            </h3>
            <span className="rounded-full border border-grid px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-muted dark:border-white/10 dark:text-zinc-400">
              Preview
            </span>
          </div>

          <div className="mt-3 flex min-h-52 flex-1 flex-col rounded-xl border border-grid bg-lifted p-4 dark:border-white/[0.08] dark:bg-black/20">
            {previewSrc ? (
              <div className="relative min-h-36 flex-1 overflow-hidden rounded-lg border border-grid dark:border-white/[0.06]">
                <Image
                  src={previewSrc}
                  alt={selectedFile?.name ?? activeSample?.label ?? "Selected sample"}
                  fill
                  unoptimized
                  className="object-contain"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            ) : (
              <div className="grid min-h-36 flex-1 place-items-center rounded-lg border border-dashed border-grid text-center dark:border-white/10">
                <p className="max-w-xs px-4 text-sm leading-6 text-muted">
                  Select a sample or upload an image to prepare an experiment.
                </p>
              </div>
            )}

            {requestState === "loading" ? (
              <div
                role="status"
                aria-label="Checking inference service"
                className="mt-4 space-y-2"
              >
                <div className="h-3 w-2/3 animate-pulse rounded bg-obsidian dark:bg-white/10" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-obsidian dark:bg-white/[0.07]" />
                <div className="h-3 w-3/4 animate-pulse rounded bg-obsidian dark:bg-white/[0.05]" />
              </div>
            ) : requestMessage ? (
              <p
                role="status"
                className="mt-4 rounded-lg border border-amber-700/20 bg-amber-50 p-3 text-xs leading-5 text-amber-800 dark:border-amber-300/15 dark:bg-amber-200/[0.04] dark:text-amber-100/80"
              >
                {requestMessage}
              </p>
            ) : (
              <div className="mt-4 grid grid-cols-2 gap-3">
                {modelNames[mode].map((model) => (
                  <div
                    key={model}
                    className="rounded-lg border border-grid bg-obsidian p-3 dark:border-white/[0.07] dark:bg-white/[0.02]"
                  >
                    <p className="font-mono text-[10px] text-primary dark:text-zinc-300">
                      {model}
                    </p>
                    <p className="mt-2 inline-flex items-center gap-1.5 font-mono text-[9px] text-amber-700 dark:text-amber-200/75">
                      <span className="size-1.5 rounded-full bg-amber-300/80" />
                      Weights not loaded
                    </p>
                    <p className="mt-1 font-mono text-[9px] text-muted">
                      {mode === "plant" ? "Accuracy —" : "mAP —"}
                    </p>
                    <p className="mt-1 font-mono text-[9px] text-muted">
                      Inference backend not connected
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            disabled={requestState === "loading"}
            onClick={runInference}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-obsidian transition-colors hover:bg-accent hover:text-white disabled:cursor-wait disabled:opacity-60"
          >
            <WandSparkles size={16} />
            {requestState === "loading" ? "Checking service…" : "Run experiment"}
          </button>
          <p className="mt-2 text-center font-mono text-[9px] text-muted">
            Predictions require a configured model inference service.
          </p>
        </div>
      </div>
    </div>
  )
}
