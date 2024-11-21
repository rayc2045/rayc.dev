# brew install webp
# brew install libavif
# chmod +x convert_images.sh
# ./convert_images.sh

clear

images=( *.{jpeg,jpg,png} )
current=0
total=${#images[@]}

for img in "${images[@]}"; do
  if [[ -f "$img" ]]; then
    # file base name
    base_name="${img%.*}"

    # webp
    # cwebp -q 80 example.png -o example.webp
    if [[ -f "${base_name}.webp" ]]; then
      echo "已有 ${base_name}.webp 文件，跳過轉換"
    else
      echo "正在將 $img 轉換為 ${base_name}.webp ..."
      cwebp -q 80 "$img" -o "${base_name}.webp"
    fi

    # avif
    # avifenc --min 20 --max 30 --speed 4 example.png example.avif;
    if [[ -f "${base_name}.avif" ]]; then
      echo "已有 ${base_name}.avif 文件，跳過轉換"
    else
      echo "正在將 $img 轉換為 ${base_name}.avif ..."
      avifenc --min 20 --max 30 --speed 4 "$img" "${base_name}.avif"
    fi

    ((current++))
    clear
    echo "($current/$total)"
  fi
done

echo "資料夾內圖片轉檔壓縮完成！"
