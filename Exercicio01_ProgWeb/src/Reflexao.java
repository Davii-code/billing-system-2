import javax.swing.JOptionPane;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

public class Reflexao {

  public static void listarAtributosEMetodos(Object obj) {
    Class<?> clazz = obj.getClass();

    System.out.println("Classe: " + clazz.getName());
    System.out.println("Herança:");
    Class<?> superClass = clazz.getSuperclass();
    while (superClass != null) {
      System.out.println(" - " + superClass.getName());
      superClass = superClass.getSuperclass();
    }

    System.out.println("\nAtributos:");
    listarAtributosRecursivamente(clazz);

    System.out.println("\nMétodos:");
    listarMetodosRecursivamente(clazz);
  }

  private static void listarAtributosRecursivamente(Class<?> clazz) {
    if (clazz == null) return;

    Field[] fields = clazz.getDeclaredFields();
    for (Field field : fields) {
      System.out.println(Modifier.toString(field.getModifiers()) + " " + field.getType().getSimpleName() + " " + field.getName());
    }
    listarAtributosRecursivamente(clazz.getSuperclass());
  }

  private static void listarMetodosRecursivamente(Class<?> clazz) {
    if (clazz == null) return;

    Method[] methods = clazz.getDeclaredMethods();
    for (Method method : methods) {
      System.out.println(Modifier.toString(method.getModifiers()) + " " + method.getReturnType().getSimpleName() + " " + method.getName() + getParametros(method));
    }
    listarMetodosRecursivamente(clazz.getSuperclass());
  }

  private static String getParametros(Method method) {
    StringBuilder parametros = new StringBuilder("(");
    Class<?>[] paramTypes = method.getParameterTypes();
    for (int i = 0; i < paramTypes.length; i++) {
      parametros.append(paramTypes[i].getSimpleName());
      if (i < paramTypes.length - 1) {
        parametros.append(", ");
      }
    }
    parametros.append(")");
    return parametros.toString();
  }

  public static void main(String[] args) {
    String[] options = {"Avô", "Pai", "Filho"};
    String choice = (String) JOptionPane.showInputDialog(null, "Escolha uma instância para criar:",
      "Escolha de Instância", JOptionPane.PLAIN_MESSAGE, null, options, options[0]);

    Object instance = null;

    if (choice != null) {
      switch (choice) {
        case "Avô":
          instance = new Avo();
          break;
        case "Pai":
          instance = new Pai();
          break;
        case "Filho":
          instance = new Filho();
          break;
      }

      if (instance != null) {
        listarAtributosEMetodos(instance);
      } else {
        System.out.println("Instância não criada.");
      }
    } else {
      System.out.println("Nenhuma escolha feita.");
    }
  }
}
