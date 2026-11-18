export const labProjects = [
  {
    id: "vit",
    name: "ViT-Base",
    task: "Image classification",
    dataset: "Plant disease classification dataset",
    metrics: ["Accuracy", "Macro F1"],
    weightsUrl:
      "https://huggingface.co/Gouraavvvv/Computer-vision-models/resolve/main/vit_best.pth",
  },
  {
    id: "swin",
    name: "Swin-Base",
    task: "Image classification",
    dataset: "Plant disease classification dataset",
    metrics: ["Accuracy", "Macro F1"],
    weightsUrl:
      "https://huggingface.co/Gouraavvvv/Computer-vision-models/resolve/main/swin_best.pth",
  },
  {
    id: "yolov8",
    name: "YOLOv8",
    task: "Object detection",
    dataset: "PASCAL VOC 2012",
    metrics: ["mAP", "Precision", "Recall"],
    weightsUrl:
      "https://huggingface.co/Gouraavvvv/Computer-vision-models/resolve/main/yolov8_best.pt",
  },
  {
    id: "yolov5",
    name: "YOLOv5",
    task: "Object detection",
    dataset: "PASCAL VOC 2012",
    metrics: ["mAP", "Precision", "Recall"],
    weightsUrl:
      "https://huggingface.co/Gouraavvvv/Computer-vision-models/resolve/main/yolov5_best.pt",
  },
  {
    id: "faster-rcnn",
    name: "Faster R-CNN",
    task: "Object detection",
    dataset: "PASCAL VOC 2012",
    metrics: ["mAP", "Precision", "Recall"],
    weightsUrl:
      "https://huggingface.co/Gouraavvvv/Computer-vision-models/resolve/main/fasterRCNN_best.pth",
  },
  {
    id: "ssd300",
    name: "SSD300",
    task: "Object detection",
    dataset: "PASCAL VOC 2012",
    metrics: ["mAP", "Precision", "Recall"],
    weightsUrl:
      "https://huggingface.co/Gouraavvvv/Computer-vision-models/resolve/main/SSD300_best.pth",
  },
] as const
